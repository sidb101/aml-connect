use anyhow::{ensure, Result};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SqliteConnection};
use std::fs::{self};
use std::path::PathBuf;

use crate::aml_core::{file_data_manager::*, project_manager};

use crate::aml_core::db_adapter::models::{InputData, NewInputData};
use crate::aml_core::db_adapter::schema::input_data;

/// For a given filename, this function derives the absolute path of the file
/// the app_dir is setup at the app startup, and can be fetched from tauri state
fn get_file_absolute_path(
    project_dir: &str,
    file_name: String,
    app_dir: &PathBuf,
) -> Result<PathBuf> {
    Ok(app_dir.join(project_dir).join("audio").join(file_name))
}

/// Validates the input file exists for a given project, as specified by FileUploadRequest filename
fn validate_exists(
    project_slug: &str,
    f: &FileUploadRequest,
    app_dir: &PathBuf,
) -> Result<PathBuf> {
    let file_path = get_file_absolute_path(project_slug, f.file_name.clone(), app_dir)?;
    ensure!(file_path.exists(), "File does not exist");
    Ok(file_path)
}


/// validates the extension of a file at `file_path` matches `extension`
fn validate_extension(file_path: &PathBuf, extension: String) -> Result<()> {
    ensure!(
        file_path
            .extension()
            .unwrap()
            .to_os_string()
            .to_str()
            .unwrap()
            == extension,
        "Invalid file extension"
    );
    Ok(())
}

/// validate file size is less than 20 MB
fn validate_size(file_path: &PathBuf) -> Result<()> {
    ensure!(
        file_path.metadata().unwrap().len() < 20 * 1024 * 1024,
        "File size is too large"
    );
    Ok(())
}

/// Performs levels of validation for a given FileUploadRequest, returns the \
/// validation status in a basic FilesUploadResponse
pub fn validate_files(
    project_slug: &str,
    files: &Vec<FileUploadRequest>,
    app_dir: &PathBuf,
) -> FilesUploadResponse {
    let mut response: FilesUploadResponse = FilesUploadResponse {
        upload_success_files: Vec::new(),
        upload_failed_files: Vec::new(),
        attempted: files.len() as i32,
        succeeded: 0,
        failed: 0,
    };

    for file in files {
        let file_path = validate_exists(project_slug, file, app_dir);

        match file_path {
            Err(_) => {
                response.upload_failed_files.push(FileUploadErrorResponse {
                    file_name: file.file_name.clone(),
                    error_response: FileUploadError::FileNotFound,
                });
            }
            Ok(file_path) => {
                if validate_extension(&file_path, "wav".to_string()).is_err() {
                    response.upload_failed_files.push(FileUploadErrorResponse {
                        file_name: file.file_name.clone(),
                        error_response: FileUploadError::UnsupportedFileExtension,
                    });
                } else if validate_size(&file_path).is_err() {
                    response.upload_failed_files.push(FileUploadErrorResponse {
                        file_name: file.file_name.clone(),
                        error_response: FileUploadError::FileTooLarge,
                    });
                } else {
                    response.upload_success_files.push(FileMetadata {
                        file_id: String::from(""), // will be derived later
                        file_name: file.file_name.clone(),
                        dataset_type: file.dataset_type.clone(),
                    });
                }
            }
        }
    }

    response
}

/// Validates the input files stored in the appdata dir and saves their metadata to the database
///
/// # Arguments
/// * `FilesUploadRequest`: JSON struct holding
///     proj_slug: project_slug  
///     input_files: vector of FileUploadRequest
///
/// # Returns
/// * `SaveFilesResponseResult`: A result typedef, holding Ok(FilesUploadResponse) and Err(Error) variants
pub fn save_input_files(
    input: &FilesUploadRequest,
    app_dir: &PathBuf,
    conn: &mut PooledConnection<ConnectionManager<SqliteConnection>>,
) -> SaveFilesResponseResult {
    // validation of the list of input file paths (file will be deleted if invalid)
    let mut ans: FilesUploadResponse =
        validate_files(&input.proj_slug, &input.input_files, app_dir);
    let succesfull_uploads = ans.upload_success_files.clone();
    ans.upload_success_files.clear();

    // Check input.project_slug must exist in db
    let found_project =
        match project_manager::get_projects::get_project_by_slug(&input.proj_slug, conn) {
            Ok(project) => project,
            Err(e) => {
                return Err(AppError::ProjectManagerError(e));
            }
        };

    for file in succesfull_uploads {
        let dataset_type = file.dataset_type.to_string();
        let fpath =
            get_file_absolute_path(&input.proj_slug, file.file_name.clone(), app_dir).unwrap();
        let fpath_str = fpath.to_str().unwrap();
        let fsize = fpath.metadata().unwrap().len();
        let new_input_files = NewInputData {
            project_id: found_project.id,
            ml_dataset_type: Some(dataset_type.as_ref()),
            file_name: Some(file.file_name.as_ref()),
            file_type: Some("audio"),
            file_extension: Some(".wav"),
            file_size: Some(fsize as i32),
            file_path: Some(fpath_str),
            uploaded_data: None,
        };

        let db_upload_res = diesel::insert_into(input_data::table)
            .values(&new_input_files)
            .on_conflict(input_data::file_name)
            .do_nothing()
            .execute(conn);

        if db_upload_res.is_err() {
            ans.upload_failed_files.push(FileUploadErrorResponse {
                file_name: file.file_name.clone(),
                error_response: FileUploadError::UnableToStoreInDatabase(
                    db_upload_res.unwrap_err().to_string(),
                ),
            });
        } else {
            ans.upload_success_files.push(file);
        }
    }

    // delete all files that failed to upload
    for file in ans.upload_failed_files.iter() {
        let file_path =
            get_file_absolute_path(&input.proj_slug, file.file_name.clone(), app_dir).unwrap();
        println!(
            "Deleting file: {:?} for reason {}",
            file_path, file.error_response
        );
        if file_path.exists() {
            fs::remove_file(file_path).map_err(|_e| {
                AppError::FileUploadError(FileUploadError::UnableToDeleteFile(
                    file.file_name.clone(),
                ))
            })?;
        }
        ans.failed += 1;
    }

    for file in ans.upload_success_files.iter_mut() {
        let found_file = input_data::table
            .filter(input_data::file_name.eq(&file.file_name))
            .first::<InputData>(conn)
            .map_err(|e| AppError::InternalError(e.to_string()))?;
        ans.succeeded += 1;
        file.file_id = found_file.id.to_string();
    }

    Ok(ans)
}

// unit tests
#[cfg(test)]
mod tests {
    use std::fs::File;
    use std::path::PathBuf;

    use crate::aml_core::file_data_manager::*;

    #[test]
    fn test_get_file_absolute_path() {
        // arrange
        let project_dir = "test_project";
        let file_name = "test_file.wav".to_string();
        let app_dir = PathBuf::from("~/.local/share/aml_connect/");
        let expected_file_path =
            PathBuf::from("~/.local/share/aml_connect/test_project/audio/test_file.wav");

        // act
        let file_path =
            put_files::get_file_absolute_path(project_dir, file_name, &app_dir).unwrap();

        // assert
        assert_eq!(file_path, expected_file_path);
    }

    #[ignore]
    #[test]
    fn test_validate_exists() {
        // arrange
        let project_slug = "test_project";
        let file_name = "test_file.wav".to_string();

        // Get the user's home directory
        let home_dir = dirs::home_dir().unwrap();

        // Define the subpath
        let subpath = ".local/share/aml_connect/";

        // Create a PathBuf by concatenating the home directory with the subpath
        let app_dir = home_dir.join(subpath);

        let file_path =
            put_files::get_file_absolute_path(project_slug, file_name.clone(), &app_dir).unwrap();
        println!("file_path: {:?}", file_path);
        let _ = File::create(&file_path).expect("Error encountered while creating file!");

        let fur = FileUploadRequest {
            file_name: file_name.clone(),
            dataset_type: DataSet::Training,
        };

        // act
        let result = put_files::validate_exists(project_slug, &fur, &app_dir);
        let _ = std::fs::remove_file(file_path);

        // assert
        assert!(result.is_ok());
    }

    #[ignore]
    #[test]
    fn test_validate_exists_2() {
        // arrange
        let project_slug = "test_project";
        let file_name = "test_file.wav".to_string();

        // Get the user's home directory
        let home_dir = dirs::home_dir().unwrap();

        // Define the subpath
        let subpath = ".local/share/aml_connect/";

        // Create a PathBuf by concatenating the home directory with the subpath
        let app_dir = home_dir.join(subpath);

        let file_path =
            put_files::get_file_absolute_path(project_slug, file_name.clone(), &app_dir).unwrap();
        println!("file_path: {:?}", file_path);
        let _ = File::create(&file_path).expect("Error encountered while creating file!");

        let fur = FileUploadRequest {
            file_name: "test_file2.wav".to_string(), // different filename
            dataset_type: DataSet::Training,
        };

        // act
        let result = put_files::validate_exists(project_slug, &fur, &app_dir);
        let _ = std::fs::remove_file(file_path);

        // assert
        assert!(result.is_err());
    }

    #[test]
    fn test_validate_extension() {
        // arrange
        let file_path = PathBuf::from("~/.local/share/aml_connect/test_project/test_file.wav");

        // act
        let result = put_files::validate_extension(&file_path, String::from("wav"));

        // assert
        assert!(result.is_ok());
    }

    #[test]
    fn test_validate_extension2() {
        // arrange
        let file_path = PathBuf::from("~/.local/share/aml_connect/test_project/test_file.mp3");

        // act
        let result = put_files::validate_extension(&file_path, String::from("wav"));

        // assert
        assert!(result.is_err());
    }
}
