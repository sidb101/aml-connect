use crate::aml_connect::aml_core::db_adapter::models::*;
use std::env;

use aml_connect::{
    self,
    aml_core::db_adapter::{self},
};
use diesel::{
    query_dsl::methods::FilterDsl, ExpressionMethods, RunQueryDsl,
    SelectableHelper, Connection,
};
use log::info;

#[test]
fn save_on_db() {
    env::set_var("DATABASE_PATH", "./tests/integration-test-1.db");
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    let mut conn = conn_pool.get().unwrap();
    conn.begin_test_transaction().unwrap();
}

#[test]
fn save_file_metadata() {
    env::set_var("DATABASE_PATH", "./tests/integration-test-2.db");
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();
    let conn = &mut conn_pool.get().unwrap();

    use crate::aml_connect::aml_core::db_adapter::schema::projects;
    let new_project = NewProject {
        description: Some("Test project".to_string()),
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
