// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use aml_connect::uicontroller;
use aml_connect::aml_core::db_adapter::{establish_connection, run_db_migrations};
use log::{info, warn};
use simple_logger::SimpleLogger;
use diesel::SqliteConnection;
use diesel::r2d2::{ConnectionManager, Pool};

fn main() {
    info!("Starting AML Connect...");
    init_logger();
    
    let db_conn_pool = init_db();

    tauri::Builder::default()
        .manage(db_conn_pool)
        .invoke_handler(tauri::generate_handler![uicontroller::get_elements])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn init_db() -> Pool<ConnectionManager<SqliteConnection>> {
    let db_conn_pool= establish_connection().unwrap_or_else(|e| { 
        panic!("Could not establish connection to database :{:?}", e);
    });

    //Ensures that the migrations are run before the application starts
    run_db_migrations(&db_conn_pool).unwrap_or_else(|e| { 
        warn!("Failed to run pending database migrations :{:?}", e);
        ()
    });
    db_conn_pool
}

fn init_logger() {
    SimpleLogger::new().init().unwrap_or_else(|e| { 
        panic!("Failed to initialize logger :{:?}", e);
    });
}
