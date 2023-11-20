pub mod aml_core;

pub mod uicontroller {
    use std::collections;

    use crate::aml_core::file_data_manager;
    use crate::aml_core::network_manager;
    use crate::aml_core::{element_repository, project_manager};
    use diesel::r2d2::{ConnectionManager, Pool};
    use diesel::SqliteConnection;
    use tauri::State;

    #[tauri::command]
    pub fn get_elements() -> element_repository::GetElementsResponseResult {
        element_repository::list_elements_from_simulator()
    }

    #[tauri::command]
    pub fn put_files(
        input: file_data_manager::FilesUploadRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> file_data_manager::SaveFilesResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        file_data_manager::put_files::save_input_files(&input, &app_dir, conn)
    }

    #[tauri::command]
    pub fn get_files(
        req: file_data_manager::GetFilesRequest,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> file_data_manager::GetFilesResponseResult {
        log::info!("get_files request: {:?}", req);
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        file_data_manager::get_files::get_input_files(&req, conn)
    }

    #[tauri::command]
    pub fn get_projects(
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> project_manager::GetProjectsResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        project_manager::get_projects::get_projects(conn)
    }    

    #[tauri::command]
    pub fn simulate_network(
        req: network_manager::SimulateNetworkRequest,
        app_dir: State<std::path::PathBuf>,
    ) -> network_manager::SimulateNetworkResponse {
        let nvo: network_manager::NetworkVO = req.network;
        let _actual_network: network_manager::Network = nvo.to_network().unwrap();
        let audio_path: String = req.audio_file_path;

        println!("app dir: {}", app_dir.as_path().display());
        let _j = serde_json::to_string(&_actual_network).unwrap();

        // Print, write to a file, or send to an HTTP server.
        println!("{}", audio_path);

        // call simulate network
        // network_manager::simulate_network(&actual_network, &audio_path);
        // 42
        let resp: collections::HashMap<String, Vec<f64>> = collections::HashMap::new();

        network_manager::SimulateNetworkResponse {
            response: resp,
            visualization_path: "123".to_string(),
            py_code_path: "345".to_string(),
        }
    }
    
}
