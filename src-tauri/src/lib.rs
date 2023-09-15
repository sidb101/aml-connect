pub mod aml_core;

pub mod uicontroller {
    use serde_json;

    use crate::aml_core::element_repository;
    use crate::aml_core::network_manager::SimulatorError;

    #[tauri::command]
    pub fn get_elements() -> Result<serde_json::Value, SimulatorError> {
        let elements_json = element_repository::list_elements_from_simulator()?;
        Ok(elements_json)
    }

    use crate::aml_core::file_data_manager;
    use tauri::State;
    use diesel::r2d2::{ConnectionManager, Pool};
    use diesel::SqliteConnection;
    
    #[tauri::command]
    pub fn put_files(
        input: file_data_manager::FilesUploadRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> file_data_manager::SaveFilesResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        file_data_manager::put_files::save_input_files(&input, &app_dir, conn)
    }
}
