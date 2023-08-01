// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use aml_connect::uicontroller;
use aml_connect::aml_core::data_manager;

fn main() {
    init_fs();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![uicontroller::get_elements, uicontroller::put_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn init_fs() {
    data_manager::create_project_dir_if_not_exists().unwrap_or_else(|e| { 
        panic!("Could not create project dir :{:?}", e);
    });
}