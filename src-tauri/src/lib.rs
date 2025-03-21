pub mod aml_core;

pub mod uicontroller {

    use crate::aml_core::file_data_manager;
    use crate::aml_core::network_manager::{self, NetworkSimulator};
    use crate::aml_core::{element_repository, project_manager};
    use diesel::r2d2::{ConnectionManager, Pool};
    use diesel::SqliteConnection;
    use tauri::State;

    #[tauri::command]
    #[cfg(not(tarpaulin_include))]
    pub fn get_elements(handle: tauri::AppHandle) -> element_repository::GetElementsResponseResult {
        let resource_path = handle.path_resolver()
            .resolve_resource("resources/elements.json")
            .ok_or(element_repository::GetElementsError::FileError(
                "Could not load elements.json".to_string()
            ))?;
        element_repository::list_elements_from_simulator(&resource_path)
    }

    #[tauri::command]
    #[cfg(not(tarpaulin_include))]
    pub fn put_files(
        input: file_data_manager::FilesUploadRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> file_data_manager::SaveFilesResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        file_data_manager::put_files::save_input_files(&input, &app_dir, conn)
    }

    #[tauri::command]
    #[cfg(not(tarpaulin_include))]
    pub fn get_files(
        req: file_data_manager::GetFilesRequest,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> file_data_manager::GetFilesResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        file_data_manager::get_files::get_input_files(&req, conn)
    }

    #[tauri::command]
    #[cfg(not(tarpaulin_include))]
    pub fn get_projects(
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> project_manager::GetProjectsResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        project_manager::get_projects::get_projects(conn)
    }

    #[tauri::command]
    #[cfg(not(tarpaulin_include))]
    pub fn simulate_network(
        req: network_manager::SimulateNetworkRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>
    ) -> Result<network_manager::SimulateNetworkResponse, network_manager::SimulatorError> {
        let conn = &mut db_conn.get().expect("Unable to get db connection");

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
                conn
            )?;

        Ok(resp)
    }

    #[tauri::command]
    #[cfg(not(tarpaulin_include))]
    pub fn create_project(
        req: project_manager::CreateProjectRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> project_manager::CreateProjectResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        project_manager::create_project::create_project(&req, &app_dir, conn)
    }

    #[tauri::command]
    #[cfg(not(tarpaulin_include))]
    pub fn delete_project(
        req: project_manager::DeleteProjectRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> project_manager::DeleteProjectResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        project_manager::delete_project::delete_project(&req, &app_dir, conn)
    }

    #[tauri::command]
    #[cfg(not(tarpaulin_include))]
    pub fn update_project(
        req: project_manager::UpdateProjectRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> project_manager::UpdateProjectResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        project_manager::update_project::update_project(&req, &app_dir, conn)
    }
}
