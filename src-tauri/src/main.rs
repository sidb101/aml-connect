// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use aml_connect::uicontroller;
use directories::ProjectDirs;

fn main() {
    // let proj_dirs = ProjectDirs::from("com", "aspinity", "aml_connect").unwrap();
    // println!("{}", format!("{}/",proj_dirs.data_local_dir().display()).as_str());

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![uicontroller::get_elements])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
