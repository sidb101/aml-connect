pub mod aml_core;

pub mod uicontroller {

    use crate::aml_core::file_data_manager;
    use crate::aml_core::network_manager::{self, NetworkSimulator};
    use crate::aml_core::{element_repository, project_manager};
    use diesel::r2d2::{ConnectionManager, Pool};
    use diesel::SqliteConnection;
    use tauri::State;

    #[tauri::command]
    pub fn get_elements(handle: tauri::AppHandle) -> element_repository::GetElementsResponseResult {
        let resource_path = handle.path_resolver()
            .resolve_resource("resources/elements.json")
            .ok_or(element_repository::GetElementsError::FileError(
                "Could not load elements.json".to_string()
            ))?;
        element_repository::list_elements_from_simulator(&resource_path)
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
    ) -> Result<network_manager::SimulateNetworkResponse, network_manager::SimulatorError> {
        let nvo: network_manager::NetworkVO = req.network;
        let project_slug: String = req.project_slug;
        let sc = network_manager::AmlSimulatorSidecar::new();
        let actual_network: network_manager::Network = nvo.to_network().unwrap();
        let audio_path_str: String = req.audio_file_path;
        let audio_path = std::path::Path::new(&audio_path_str);

        // call simulate network
        let audio_path = std::path::Path::new(&audio_path);
        let resp: network_manager::SimulateNetworkResponse =
            network_manager::AmlSimulator::sidecar_simulate_network(
                &project_slug,
                &sc,
                &actual_network,
                &audio_path,
                &app_dir,
            )?;

        Ok(resp)
    }
}
