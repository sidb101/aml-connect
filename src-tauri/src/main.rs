// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use diesel::r2d2::{ConnectionManager, Pool};
use diesel::SqliteConnection;
use log::{info, warn};
use simple_logger::SimpleLogger;
use std::path::PathBuf;

use aml_connect::aml_core::db_adapter;
use aml_connect::aml_core::file_data_manager;
use aml_connect::uicontroller;



fn main() {
    info!("Starting AML Connect...");

    tauri::Builder::default()
        .setup(|app| {
            init_logger();
            info!("Initializing AML Connect...");
            let app_dir = init_fs(&app.path_resolver());
            let db_conn_pool = init_db(app_dir.clone());
            tauri::Manager::manage(app, db_conn_pool);
            tauri::Manager::manage(app, app_dir);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            uicontroller::get_elements,
            uicontroller::put_files,
            uicontroller::get_files,
            uicontroller::get_projects,
            uicontroller::create_project,
            uicontroller::delete_project,
            uicontroller::update_project,
            uicontroller::simulate_network,  
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn init_db(_: PathBuf) -> Pool<ConnectionManager<SqliteConnection>> {
    let db_conn_pool = db_adapter::establish_connection().unwrap_or_else(|e| {
        panic!("Could not establish connection to database :{:?}", e);
    });

    //Ensures that the migrations are run before the application starts
    db_adapter::run_db_migrations(&db_conn_pool).unwrap_or_else(|e| {
        warn!("Failed to run pending database migrations :{:?}", e);
        ()
    });

    db_conn_pool
}

fn init_fs(path_resolver: &tauri::PathResolver) -> PathBuf {
    // TODO: Fix
    file_data_manager::create_app_dir_if_not_exists(path_resolver).unwrap_or_else(|e| {
        panic!("Could not create app dir :{:?}", e);
    })
}

fn init_logger() {
    SimpleLogger::new().init().unwrap_or_else(|e| {
        panic!("Failed to initialize logger :{:?}", e.to_string());
    });
}
