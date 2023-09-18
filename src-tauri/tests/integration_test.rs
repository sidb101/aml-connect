use crate::aml_connect::aml_core::db_adapter::models::*;
use std::{env, path::{Path, PathBuf}};

use aml_connect::{
    self,
    aml_core::{db_adapter::{self, schema::projects}, file_data_manager::{FilesUploadRequest, FileUploadRequest, DataSet, self}},
};
use diesel::{
    query_dsl::methods::FilterDsl, Connection, ExpressionMethods, RunQueryDsl, SelectableHelper,
};
use directories::BaseDirs;
use log::info;

use aml_connect::aml_core::network_manager::{self, SimulatorError, NetworkSimulator};
use serde_json::{self, Value};

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

#[ignore]
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

    let app_dir = PathBuf::from(BaseDirs::new().unwrap().data_local_dir());

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

    let app_dir = PathBuf::from(BaseDirs::new().unwrap().data_local_dir());
    let file_upload_response = file_data_manager::put_files::save_input_files(&request, &app_dir, conn );
    println!("file_upload_response : {:?}", file_upload_response);
    assert!(file_upload_response.as_ref().is_ok());
    assert!(file_upload_response.as_ref().unwrap().upload_failed_files.len() == 2);
    assert!(file_upload_response.as_ref().unwrap().attempted == 2);
    assert!(file_upload_response.as_ref().unwrap().succeeded == 0);
    assert!(file_upload_response.as_ref().unwrap().failed == 2);

}
