use crate::aml_connect::aml_core::db_adapter::models::*;
use std::{env, path::{Path, PathBuf}};

use aml_connect::{
    self,
    aml_core::{db_adapter::{self, schema::projects}, data_manager::{FilesUploadRequest, FileUploadRequest, DataSet, self}},
};
use diesel::{
    query_dsl::methods::FilterDsl, Connection, ExpressionMethods, RunQueryDsl, SelectableHelper,
};
use directories::BaseDirs;
use log::info;

#[ignore]
#[test]
fn save_on_db() {
    // if exists, purge db before test
    let db_path = "./tests/integration-test-1.db";

    if Path::new(db_path).exists() {
        std::fs::remove_file(db_path).unwrap();
    }
    env::set_var("DATABASE_PATH", db_path);
    println!("DATABASE_PATH : {:?}", env::var("DATABASE_PATH"));
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    let mut conn = conn_pool.get().unwrap();
    conn.begin_test_transaction().unwrap();
}

#[ignore]
#[test]
fn save_file_metadata() {
    // if exists, purge db before test
    let db_path = "./tests/integration-test-2.db";

    if Path::new(db_path).exists() {
        std::fs::remove_file(db_path).unwrap();
    }

    env::set_var("DATABASE_PATH", db_path);
    println!("DATABASE_PATH : {:?}", env::var("DATABASE_PATH"));
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();
    let conn = &mut conn_pool.get().unwrap();

    use crate::aml_connect::aml_core::db_adapter::schema::projects;
    let new_project = NewProject {
        description: Some("Test project".to_string()),
        slug: "test_project".to_string(),
    };

    let project = diesel::insert_into(projects::table)
        .values(&new_project)
        .returning(Project::as_returning())
        .get_result::<Project>(conn)
        .unwrap();

    info!("Project: {:?}", project);

    let new_input_data = NewInputData {
        file_name: Some("file1.wav"),
        project_id: project.id,
        ml_dataset_type: None,
        file_type: None,
        file_extension: None,
        file_size: None,
        file_path: None,
        uploaded_data: None,
    };

    use crate::aml_connect::aml_core::db_adapter::schema::input_data;
    let input_data = diesel::insert_into(input_data::table)
        .values(&new_input_data)
        .returning(InputData::as_returning())
        .get_result::<InputData>(conn)
        .unwrap();

    let new_audio_file = NewAudioFile {
        input_data_id: input_data.id,
        length: Some(1),
        category: Some("noisy"),
        peak_frequency: None,
        spi_level: None,
    };

    use crate::aml_connect::aml_core::db_adapter::schema::audio_files;
    diesel::insert_into(audio_files::table)
        .values(&new_audio_file)
        .returning(AudioFile::as_returning())
        .execute(conn)
        .unwrap();

    let found_project = projects::table
        .filter(projects::id.eq(project.id))
        .first::<Project>(conn)
        .unwrap();

    assert!(found_project.description == project.description);
}

#[ignore]
#[test]
fn validate_file_and_save_metadata () {
    // if exists, purge db before test
    let db_path = "./tests/integration-test-3.db";

    if Path::new(db_path).exists() {
        std::fs::remove_file(db_path).unwrap();
    }
    env::set_var("DATABASE_PATH", db_path);
    println!("DATABASE_PATH : {:?}", env::var("DATABASE_PATH"));
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();
    let conn = &mut conn_pool.get().unwrap();

    let request = FilesUploadRequest {
        proj_slug: "test_project".to_string(),
        input_files: vec![FileUploadRequest {
           file_name: "bearing-faults.wav".to_string(),
           dataset_type: DataSet::Training, 
        },
        FileUploadRequest {
           file_name: "bearing-faults.wav".to_string(),
           dataset_type: DataSet::Training, 
        }], 
    };

    let project_slug = "test_project";
    let dummy_project = NewProject {
        slug: project_slug.to_owned(),
        description: Some("This is a test project".to_owned()),
    };
    diesel::insert_into(projects::table)
        .values(&dummy_project)
        .execute(conn).unwrap();

    let app_dir = PathBuf::from(BaseDirs::new().unwrap().data_local_dir());

    let file_upload_response = data_manager::save_input_files(&request, &app_dir, conn);

    assert!(file_upload_response.is_ok());
    assert!(file_upload_response.unwrap().upload_success_files.len() == 2);
    // assert!(file_upload_response.unwrap().upload_success_files[0].file_name == "bearing-faults.wav");
}

#[ignore]
#[test]
fn validate_file_and_save_metadata_check_exists () {
    // if exists, purge db before test
    let db_path = "./tests/integration-test-3.db";

    if Path::new(db_path).exists() {
        std::fs::remove_file(db_path).unwrap();
    }
    env::set_var("DATABASE_PATH", db_path);
    println!("DATABASE_PATH : {:?}", env::var("DATABASE_PATH"));
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();
    let conn = &mut conn_pool.get().unwrap();

    let request = FilesUploadRequest {
        proj_slug: "test_project".to_string(),
        input_files: vec![FileUploadRequest {
           file_name: "gaga.wav".to_string(),
           dataset_type: DataSet::Training, 
        },
        FileUploadRequest {
           file_name: "gaga_2.wav".to_string(),
           dataset_type: DataSet::Training, 
        }], 
    };

    let project_slug = "test_project";
    let dummy_project = NewProject {
        slug: project_slug.to_owned(),
        description: Some("This is a test project".to_owned()),
    };
    diesel::insert_into(projects::table)
        .values(&dummy_project)
        .execute(conn).unwrap();

    let app_dir = PathBuf::from(BaseDirs::new().unwrap().data_local_dir());
    let file_upload_response = data_manager::save_input_files(&request, &app_dir, conn );
    println!("file_upload_response : {:?}", file_upload_response);
    // assert!(file_upload_response.is_ok());
    assert!(file_upload_response.unwrap().upload_failed_files.len() == 2);
    // assert!(file_upload_response.unwrap().upload_success_files[0].file_name == "bearing-faults.wav");
}

// ignore unless - youve created f2.txt in ~/.local/share/aml_connect
#[ignore]
#[test]
fn validate_file_and_save_metadata_check_extension () {
    // if exists, purge db before test
    let db_path = "./tests/integration-test-3.db";

    if Path::new(db_path).exists() {
        std::fs::remove_file(db_path).unwrap();
    }
    env::set_var("DATABASE_PATH", db_path);
    println!("DATABASE_PATH : {:?}", env::var("DATABASE_PATH"));
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();
    let conn = &mut conn_pool.get().unwrap();

    let request = FilesUploadRequest {
        proj_slug: "test_project".to_string(),
        input_files: vec![FileUploadRequest {
           file_name: "f2.txt".to_string(),
           dataset_type: DataSet::Training, 
        }], 
    };

    let project_slug = "test_project";
    let dummy_project = NewProject {
        slug: project_slug.to_owned(),
        description: Some("This is a test project".to_owned()),
    };
    diesel::insert_into(projects::table)
        .values(&dummy_project)
        .execute(conn).unwrap();

    let app_dir = PathBuf::from(BaseDirs::new().unwrap().data_local_dir());
    let file_upload_response = data_manager::save_input_files(&request, &app_dir, conn);
    println!("file_upload_response : {:?}", file_upload_response);
    assert!(file_upload_response.is_ok());
    assert!(file_upload_response.unwrap().upload_failed_files.len() == 1);
}

// ignore unless - youve created bearing-faults.wav, heart-rate.wav and rising-chirp.wav in ~/.local/share/aml_connect
#[ignore]
#[test]
fn validate_file_and_save_metadata_then_check_get_files () {
    // if exists, purge db before test
    let db_path = "./tests/integration-test-3.db";

    if Path::new(db_path).exists() {
        std::fs::remove_file(db_path).unwrap();
    }
    env::set_var("DATABASE_PATH", db_path);
    println!("DATABASE_PATH : {:?}", env::var("DATABASE_PATH"));
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();
    let conn = &mut conn_pool.get().unwrap();

    let request = FilesUploadRequest {
        proj_slug: "test_project".to_string(),
        input_files: vec![FileUploadRequest {
            file_name: "bearing-faults.wav".to_string(),
            dataset_type: DataSet::Training, 
         },
         FileUploadRequest {
            file_name: "heart-rate.wav".to_string(),
            dataset_type: DataSet::Training, 
         },
         FileUploadRequest {
            file_name: "rising-chirp.wav".to_string(),
            dataset_type: DataSet::Training, 
         }], 
    };

    let project_slug = "test_project";
    let dummy_project = NewProject {
        slug: project_slug.to_owned(),
        description: Some("This is a test project".to_owned()),
    };
    diesel::insert_into(projects::table)
        .values(&dummy_project)
        .execute(conn).unwrap();

    let app_dir = PathBuf::from(BaseDirs::new().unwrap().data_local_dir());
    let file_upload_response = data_manager::save_input_files(&request, &app_dir, conn);
    println!("file_upload_response : {:?}", file_upload_response);
    assert!(file_upload_response.is_ok());
    assert!(file_upload_response.unwrap().upload_success_files.len() == 3);

    let get_files_response = data_manager::list_files(conn);
    assert!(get_files_response.unwrap().files.len() == 3);
}