use crate::aml_connect::aml_core::db_adapter::models::*;
use std::{env, path::{Path, PathBuf}};
use anyhow::Result;
use std::fs;
use aml_connect::{
    self,
    aml_core::{db_adapter::{self, schema::projects}, file_data_manager::{FilesUploadRequest, FileUploadRequest, DataSet, self, GetFilesRequest}},
};
use diesel::{
    query_dsl::methods::FilterDsl, Connection, ExpressionMethods, RunQueryDsl, SelectableHelper,
};
use directories::BaseDirs;
use log::info;

use aml_connect::aml_core::network_manager::{self, SimulatorError, NetworkSimulator};
use serde_json::{self, Value};

fn create_app_dir_if_not_exists() -> Result<PathBuf>{
    let app_dir = PathBuf::from(BaseDirs::new().unwrap().data_local_dir())
        .join("aml_connect");
    if !app_dir.exists() {
        fs::create_dir_all(app_dir.clone())?;
    }
    Ok(app_dir)
}

fn integration_test_setup(app_dir: PathBuf) {
    let destination_dir: PathBuf = app_dir.clone().join("test_project/audio/");
    let destination_path1 = destination_dir.join("bearing-faults.wav");
    let destination_path2 = destination_dir.join("rising-chirp.wav");
    let destination_path3 = destination_dir.join("heart-rate.wav");

    fs::create_dir_all(&destination_dir).unwrap();

    fs::copy(PathBuf::from("./tests/bearing-faults.wav"), &destination_path1).unwrap();
    fs::copy(PathBuf::from("./tests/rising-chirp.wav"), &destination_path2).unwrap();
    fs::copy(PathBuf::from("./tests/heart-rate.wav"), &destination_path3).unwrap();
}

#[test]
fn save_on_db() {
    env::set_var("DATABASE_PATH", "./tests");
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    let mut conn = conn_pool.get().unwrap();
    conn.begin_test_transaction().unwrap();
}

#[test]
fn test_list_elements_from_simulator() {
    let mut sc = network_manager::AmlSimulatorSidecar::new();
    sc.sidecar_name = String::from("../aspinity_wrapper");
    let elements_json_str = network_manager::AmlSimulator::list_elements(&sc)
        .unwrap();
    let elements_json: Value = serde_json::from_str(elements_json_str.as_str())
        .map_err(|e| SimulatorError::JsonParseError(e.to_string()))
        .unwrap();

    // check that one of the keys "AcDiff" exist in elements_json
    assert!(elements_json["AcDiff"].is_object());
}


// #[ignore]
#[test]
fn save_file_metadata() {
    // set DATABASE_PATH env var
    let db_dir_path = "./tests";
    env::set_var("DATABASE_PATH", &db_dir_path);

    // if exists, purge db under "./tests" before test
    let db_name = db_adapter::DB_NAME;
    let db_path = format!("{db_dir_path}/{db_name}");
    if Path::new(&db_path).exists() {
        std::fs::remove_file(&db_path).unwrap();
    }
    
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

// #[ignore]
#[test]
fn validate_file_and_save_metadata () {
    // set DATABASE_PATH env var
    let db_dir_path = "./tests";
    env::set_var("DATABASE_PATH", &db_dir_path);

    // if exists, purge db under "./tests" before test
    let db_name = db_adapter::DB_NAME;
    let db_path = format!("{db_dir_path}/{db_name}");
    if Path::new(&db_path).exists() {
        std::fs::remove_file(&db_path).unwrap();
    }

    let app_dir = create_app_dir_if_not_exists().unwrap();
    integration_test_setup(app_dir.clone());

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

    let file_upload_response = file_data_manager::put_files::save_input_files(&request, &app_dir, conn);

    println!("file_upload_response : {}", file_upload_response.as_ref().unwrap().succeeded);

    assert!(file_upload_response.as_ref().is_ok());
    assert!(file_upload_response.as_ref().unwrap().upload_success_files.len() == 2);
    assert!(file_upload_response.as_ref().unwrap().upload_success_files[0].file_name == "bearing-faults.wav");
    assert!(file_upload_response.as_ref().unwrap().upload_success_files[1].file_name == "rising-chirp.wav");
    assert!(file_upload_response.as_ref().unwrap().upload_failed_files.len() == 0);
    assert!(file_upload_response.as_ref().unwrap().attempted == 2);
    assert!(file_upload_response.as_ref().unwrap().succeeded == 2);
    assert!(file_upload_response.as_ref().unwrap().failed == 0);
}

// #[ignore]
#[test]
fn validate_file_and_save_metadata_check_exists () {
    // set DATABASE_PATH env var
    let db_dir_path = "./tests";
    env::set_var("DATABASE_PATH", &db_dir_path);

    // if exists, purge db under "./tests" before test
    let db_name = db_adapter::DB_NAME;
    let db_path = format!("{db_dir_path}/{db_name}");
    if Path::new(&db_path).exists() {
        std::fs::remove_file(&db_path).unwrap();
    }

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

    let app_dir = create_app_dir_if_not_exists().unwrap();
    integration_test_setup(app_dir.clone());

    let file_upload_response = file_data_manager::put_files::save_input_files(&request, &app_dir, conn );
    println!("file_upload_response : {:?}", file_upload_response);
    assert!(file_upload_response.as_ref().is_ok());
    assert!(file_upload_response.as_ref().unwrap().upload_failed_files.len() == 2);
    assert!(file_upload_response.as_ref().unwrap().attempted == 2);
    assert!(file_upload_response.as_ref().unwrap().succeeded == 0);
    assert!(file_upload_response.as_ref().unwrap().failed == 2);

}

#[test]
fn get_audio_files_invalid_request () {

    let db_dir_path = "./tests";
    env::set_var("DATABASE_PATH", &db_dir_path);

    // if exists, purge db under "./tests" before test
    let db_name = db_adapter::DB_NAME;
    let db_path = format!("{db_dir_path}/{db_name}");
    if Path::new(&db_path).exists() {
        std::fs::remove_file(&db_path).unwrap();
    }
    
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();
    
    let conn = &mut conn_pool.get().unwrap();

    let request = GetFilesRequest {
        proj_slug: "".to_string(),
        dataset_type: None,
    };

    let files = file_data_manager::get_files::get_input_files(&request, conn);

    assert!(files.is_err());

    let request = GetFilesRequest {
        proj_slug: "invalid_project".to_string(),
        dataset_type: Some(DataSet::Training),
    };

    let files = file_data_manager::get_files::get_input_files(&request, conn);

    assert!(files.is_err());

}

#[test]
fn get_audio_files_valid_request () {

    let db_dir_path = "./tests";
    env::set_var("DATABASE_PATH", &db_dir_path);

    // if exists, purge db under "./tests" before test
    let db_name = db_adapter::DB_NAME;
    let db_path = format!("{db_dir_path}/{db_name}");
    if Path::new(&db_path).exists() {
        std::fs::remove_file(&db_path).unwrap();
    }
    
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();
    
    let conn = &mut conn_pool.get().unwrap();

    let request = GetFilesRequest {
        proj_slug: "".to_string(),
        dataset_type: None,
    };

    let _files = file_data_manager::get_files::get_input_files(&request, conn);

    // TODO: Use @sidb101's code to insert audio files.

}

// ignore unless - youve created bearing-faults.wav, heart-rate.wav and rising-chirp.wav in ~/.local/share/aml_connect
// #[ignore]
#[test]
fn put_files_then_check_get_files () {
    let db_dir_path = "./tests";
    env::set_var("DATABASE_PATH", &db_dir_path);

    // if exists, purge db under "./tests" before test
    let db_name = db_adapter::DB_NAME;
    let db_path = format!("{db_dir_path}/{db_name}");
    if Path::new(&db_path).exists() {
        std::fs::remove_file(&db_path).unwrap();
    }
    
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

    let app_dir = create_app_dir_if_not_exists().unwrap();
    integration_test_setup(app_dir.clone());

    let file_upload_response = file_data_manager::put_files::save_input_files(&request, &app_dir, conn);
    println!("file_upload_response : {:?}", file_upload_response);
    assert!(file_upload_response.is_ok());
    assert!(file_upload_response.unwrap().upload_success_files.len() == 3);

    let get_file_request = file_data_manager::GetFilesRequest {
        proj_slug: "test_project".to_string(),
        dataset_type: Some(DataSet::Training),
    };
    let get_files_response = file_data_manager::get_files::get_input_files(&get_file_request, conn);
    assert!(get_files_response.unwrap().files.len() == 3);
}