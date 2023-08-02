//when datamanager calls db manager (to store audio metadata in database)
//this crate would then be needed
//use crate::aml_core::network_manager::*;

use anyhow::{ensure, Context, Result};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SqliteConnection};
use directories::ProjectDirs;
use std::fmt;
use std::fs::{self};
use std::path::{Path, PathBuf};

use thiserror::Error;

use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::db_adapter::models::{NewInputData, InputData, Project};

use super::db_adapter::schema::{input_data, projects};

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
pub enum DataSet {
    Testing,
    Validation,
    Training,
}

impl fmt::Display for DataSet {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            DataSet::Testing => write!(f, "testing"),
            DataSet::Validation => write!(f, "validation"),
            DataSet::Training => write!(f, "training"),
        }
    }
}

#[derive(Error, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub enum FileUploadError {
    #[error("file not found")]
    FileNotFound,
    #[error("processing error")]
    ProcessingError,
    #[error("file too large")]
    FileTooLarge,
    #[error("unsupported file extension")]
    UnsupportedFileExtension,
    #[error("database query error")]
    UnableToQueryDatabase(String),
    #[error("database update error")]
    UnableToStoreInDatabase(String),
    #[error("Unable to delete file from Filesystem")]
    UnableToDeleteFile(String),
    // Add more error variants as needed.
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FileUploadRequest {
    pub file_name: String, // relativePath to file from baseDir (e.g. \project1\training\glass-break.wav)
    pub dataset_type: DataSet,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FilesUploadRequest {
    pub proj_slug: String,
    pub input_files: Vec<FileUploadRequest>,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FileUploadErrorResponse {
    pub file_name: String,
    pub error_response: FileUploadError,
}

//this struct will also be used got QueryAudioFiles
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FileMetadata {
    pub file_id: String,   // generated by db
    pub file_name: String, // relativePath to file from baseDir (e.g. \project1\training\glass-break.wav)
    pub dataset_type: DataSet,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FilesUploadResponse {
    pub upload_success_files: Vec<FileMetadata>, //array of relative file paths of input files that were successfully stored in server side folder
    pub upload_failed_files: Vec<FileUploadErrorResponse>,
    pub attempted: i32,
    pub succeeded: i32,
    pub failed: i32,
}

pub type SaveFilesResponse = Result<FilesUploadResponse, FileUploadError>;

pub fn create_project_dir_if_not_exists() -> Result<()> {
    let proj_dirs = ProjectDirs::from("com", "aspinity", "aml_connect")
        .with_context(|| "Failed to get application directory\n")?;
    let app_dir = proj_dirs.data_local_dir();
    if !app_dir.exists() {
        fs::create_dir_all(app_dir).with_context(|| "Failed to create application directory\n")?;
    }
    Ok(())
}

pub fn get_project_dir() -> Result<PathBuf> {
    let proj_dirs = ProjectDirs::from("com", "aspinity", "aml_connect")
        .with_context(|| "Failed to get application directory\n")?;
    let app_dir = proj_dirs.data_local_dir();
    Ok(app_dir.to_path_buf())
}

fn get_file_absolute_path(rel_path: String) -> Result<PathBuf> {
    let base_dir = get_project_dir()?;
    let rel_path = Path::new(&rel_path);
    Ok(base_dir.join(rel_path))
}


fn validate_extension(f: &FileUploadRequest, extension: String) -> Result<()> {
    ensure!(
        get_file_absolute_path(f.file_name.clone())?
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

fn validate_exists(f: &FileUploadRequest) -> Result<()> {
    // validate file exists at the given relative path
    ensure!(
        get_file_absolute_path(f.file_name.clone())?.exists(),
        "File does not exist"
    );
    Ok(())
}

fn validate_size(f: &FileUploadRequest) -> Result<()> {
    // validate file size is less than 20 MB
    ensure!(
        get_file_absolute_path(f.file_name.clone())?
            .metadata()
            .unwrap()
            .len()
            < 20 * 1024 * 1024,
        "File size is too large"
    );
    Ok(())
}

pub fn validate_files(files: &Vec<FileUploadRequest>) -> FilesUploadResponse {
    let mut response: FilesUploadResponse = FilesUploadResponse {
        upload_success_files: Vec::new(),
        upload_failed_files: Vec::new(),
        attempted: files.len() as i32,
        succeeded: 0,
        failed: 0,
    };

    for file in files {
        if validate_exists(file).is_err() {
            response.failed += 1;
            response.upload_failed_files.push(FileUploadErrorResponse {
                file_name: file.file_name.clone(),
                error_response: FileUploadError::FileNotFound,
            });
        } else if validate_extension(file, "wav".to_string()).is_err() {
            response.failed += 1;
            response.upload_failed_files.push(FileUploadErrorResponse {
                file_name: file.file_name.clone(),
                error_response: FileUploadError::UnsupportedFileExtension,
            });
        } else if validate_size(file).is_err() {
            response.failed += 1;
            response.upload_failed_files.push(FileUploadErrorResponse {
                file_name: file.file_name.clone(),
                error_response: FileUploadError::FileTooLarge,
            });
        } else {
            // generate file_id by calling db here and add to response
            response.succeeded += 1;
            response.upload_success_files.push(FileMetadata {
                file_id: String::from("1234"),
                file_name: file.file_name.clone(),
                dataset_type: file.dataset_type.clone(),
            });
        }
    }

    response
}

/// Validates the input files stored in the appdata dir and saves their metadata to the database
///
/// # Arguments
/// * `FilesUploadRequest`: JSON struct holding project_slug and vector of FileUploadRequest
///
/// # Returns
/// * `SaveFilesResponse`: A result typedef, holding Ok(FilesUploadResponse) and Err(Error) variants
pub fn save_input_files(
    input: &FilesUploadRequest,
    conn: &mut PooledConnection<ConnectionManager<SqliteConnection>>,
) -> SaveFilesResponse {
    // validation of the list of input file paths (file will be deleted if invalid)
    let mut ans: FilesUploadResponse = validate_files(&input.input_files);
    let succesfull_uploads = ans.upload_success_files.clone();

    // Assuming that project with slug test_project already exists in db
    let found_project = projects::table
        .filter(projects::slug.eq("test_project"))
        .first::<Project>(conn)
        .map_err(|e| FileUploadError::UnableToQueryDatabase(e.to_string()))?;

    for file in succesfull_uploads {
        let dataset_type = file.dataset_type.to_string();
        let new_input_files = NewInputData {
            project_id: found_project.id,
            ml_dataset_type: Some(dataset_type.as_ref()),
            file_name: Some(file.file_name.as_ref()),
            file_type: Some("audio"),
            file_extension: Some(".wav"),
            file_size: None,
            file_path: None,
            uploaded_data: None,
        };

        // TODO: Return errors for individual files if this fails instead of panicking.
        diesel::insert_into(input_data::table)
            .values(&new_input_files)
            .on_conflict(input_data::file_name)
            .do_nothing()
            .execute(conn)
            .map_err(|e| FileUploadError::UnableToStoreInDatabase(e.to_string()))?;
    }

    // delete all files that failed to upload
    for file in ans.upload_failed_files.iter() {
        let file_path = get_file_absolute_path(file.file_name.clone()).unwrap();
        println!("Deleting file: {:?}", file_path);
        if file_path.exists() {
            fs::remove_file(file_path).map_err(
                |e| FileUploadError::UnableToDeleteFile(file.file_name.clone()),
            )?;
        }
    }

    //TODO: return list of IDs for successful uploads
    for file in ans.upload_success_files.iter_mut() {
        let found_file = input_data::table
            .filter(input_data::file_name.eq(&file.file_name))
            .first::<InputData>(conn)
            .map_err(|e| FileUploadError::UnableToQueryDatabase(e.to_string()))?;
        
        file.file_id = found_file.id.to_string();
    }
    
    Ok(ans)
}
