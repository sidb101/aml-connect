// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;

use aml_connect::aml_core::data_manager;
use aml_connect::aml_core::db_adapter::models::NewProject;
use aml_connect::aml_core::db_adapter::schema::projects;
use aml_connect::aml_core::db_adapter::{establish_connection, run_db_migrations};
use aml_connect::uicontroller;
use anyhow::Context;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::{RunQueryDsl, SqliteConnection};
use log::{info, warn};
use simple_logger::SimpleLogger;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            init_logger();
            info!("Initializing AML Connect...");
            let db_conn_pool = init_db();
            let app_dir = init_fs(&app.path_resolver());
            app.manage(db_conn_pool);
            app.manage(app_dir);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            uicontroller::get_elements,
            uicontroller::put_files,
            uicontroller::get_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn init_db() -> Pool<ConnectionManager<SqliteConnection>> {
    let db_conn_pool = establish_connection().unwrap_or_else(|e| {
        panic!("Could not establish connection to database :{:?}", e);
    });

    //Ensures that the migrations are run before the application starts
    run_db_migrations(&db_conn_pool).unwrap_or_else(|e| {
        warn!("Failed to run pending database migrations :{:?}", e);
        ()
    });

    // TODO: Remove this
    add_dummy_project("test_project", &db_conn_pool).unwrap_or_else(|e| {
        warn!("Failed to add dummy project :{:?}", e);
        ()
    });

    db_conn_pool
}

fn add_dummy_project(
    project_slug: &str,
    db_conn_pool: &Pool<ConnectionManager<SqliteConnection>>,
) -> anyhow::Result<()> {
    let conn = &mut db_conn_pool
        .get()
        .with_context(|| "failed to get db connection to add dummy project")?;
    let dummy_project = NewProject {
        slug: project_slug.to_owned(),
        description: Some("This is a test project".to_owned()),
    };
    diesel::insert_into(projects::table)
        .values(&dummy_project)
        .execute(conn)
        .with_context(|| format!("failed to insert dummy project : {project_slug}"))?;
    Ok(())
}

fn init_logger() {
    SimpleLogger::new().init().unwrap_or_else(|e| {
        panic!("Failed to initialize logger :{:?}", e);
    });
}

fn init_fs(path_resolver: &tauri::PathResolver) -> PathBuf {
    data_manager::create_app_dir_if_not_exists(path_resolver).unwrap_or_else(|e| {
        panic!("Could not create app dir :{:?}", e);
    })
}
