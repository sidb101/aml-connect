use aml_connect::aml_core::{
    db_adapter::{
        self,
        models::{NewProject, Project},
        schema::{audio_files, input_data, projects},
    },
    network_manager::{self, NetworkSimulator},
};
use anyhow::Result;
use diesel::{
    r2d2::{ConnectionManager, PooledConnection},
    RunQueryDsl, SelectableHelper, SqliteConnection,
};
use directories::BaseDirs;
use serde_json;
use std::path::Path;
use std::{env, fs, path::PathBuf};

fn create_app_dir_if_not_exists() -> Result<PathBuf> {
    let app_dir =
        PathBuf::from(BaseDirs::new().unwrap().data_local_dir()).join("com.aml-connect.aspinity");
    if !app_dir.exists() {
        fs::create_dir_all(app_dir.clone())?;
    }
    Ok(app_dir)
}

#[test]
fn test_sidecar_simulate_network() {
    let db_dir_path = "./tests";
    env::set_var("DATABASE_PATH", &db_dir_path);

    let db_name = db_adapter::DB_NAME;
    let db_path = format!("{db_dir_path}/{db_name}");
    if Path::new(&db_path).exists() {
        std::fs::remove_file(&db_path).unwrap();
    }

    let conn_pool =
        db_adapter::establish_connection(&create_app_dir_if_not_exists().unwrap()).unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();

    let conn = &mut conn_pool.get().unwrap();

    let mut test_resources_dir = env::current_dir().unwrap().parent().unwrap().to_path_buf();
    test_resources_dir.push("test_resources");
    let nw_file_path = test_resources_dir.join("sidecar_test_network.json");
    let curr_network: network_manager::Network =
        serde_json::from_str(&fs::read_to_string(nw_file_path).unwrap()).unwrap();

    let proj_slug = "test_project";
    let new_project = NewProject {
        name: "Test project".to_string(),
        description: Some("Test Project".to_string()),
        slug: proj_slug.to_string(),
    };

    let _project = diesel::insert_into(projects::table)
        .values(&new_project)
        .returning(Project::as_returning())
        .get_result::<Project>(conn)
        .unwrap();

    let audio_file_path = test_resources_dir.join("rising-chirp.wav");
    let app_dir = create_app_dir_if_not_exists().unwrap();

    let mut sc = network_manager::AmlSimulatorSidecar::new();
    sc.sidecar_name = String::from("../aspinity_wrapper");

    let _resp = network_manager::AmlSimulator::sidecar_simulate_network(
        &proj_slug,
        &sc,
        &curr_network,
        &audio_file_path,
        &app_dir,
        conn,
    );

    assert!(_resp.is_ok());
    clear_db(conn);
}

#[test]
fn test_sidecar_simulate_network_invalid_project_slug() {
    let db_dir_path = "./tests";
    env::set_var("DATABASE_PATH", &db_dir_path);

    let db_name = db_adapter::DB_NAME;
    let db_path = format!("{db_dir_path}/{db_name}");
    if Path::new(&db_path).exists() {
        std::fs::remove_file(&db_path).unwrap();
    }

    let conn_pool =
        db_adapter::establish_connection(&create_app_dir_if_not_exists().unwrap()).unwrap();
    env::remove_var("DATABASE_PATH");
    db_adapter::run_db_migrations(&conn_pool).unwrap();

    let conn = &mut conn_pool.get().unwrap();

    let mut test_resources_dir = env::current_dir().unwrap().parent().unwrap().to_path_buf();
    test_resources_dir.push("test_resources");
    let nw_file_path = test_resources_dir.join("sidecar_test_network.json");
    let curr_network: network_manager::Network =
        serde_json::from_str(&fs::read_to_string(nw_file_path).unwrap()).unwrap();

    let proj_slug = "test_project_xyz"; // invalid project slug

    let audio_file_path = test_resources_dir.join("rising-chirp.wav");
    let app_dir = create_app_dir_if_not_exists().unwrap();

    let mut sc = network_manager::AmlSimulatorSidecar::new();
    sc.sidecar_name = String::from("../aspinity_wrapper");

    let _resp = network_manager::AmlSimulator::sidecar_simulate_network(
        &proj_slug,
        &sc,
        &curr_network,
        &audio_file_path,
        &app_dir,
        conn,
    );

    // let resp: network_manager::SimulateNetworkResponse = _resp.unwrap();
    assert!(_resp.is_err());
    clear_db(conn);
}

fn clear_db(conn: &mut PooledConnection<ConnectionManager<SqliteConnection>>) {
    // The order in which these databases is deleted is important since there are foreign key relations that must be kept consistent.
    diesel::delete(audio_files::table).execute(conn).unwrap();
    diesel::delete(input_data::table).execute(conn).unwrap();
    diesel::delete(projects::table).execute(conn).unwrap();
}
