// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use aml_connect::uicontroller;

fn main() {
    println!("{}", uicontroller::get_elements());

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![uicontroller::get_elements])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}