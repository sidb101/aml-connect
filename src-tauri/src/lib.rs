pub mod aml_core;

pub mod uicontroller {

    use diesel::r2d2::ConnectionManager;
    use diesel::r2d2::Pool;
    use diesel::SqliteConnection;
    use tauri::State;

    use crate::aml_core::data_manager;
    use crate::aml_core::element_repository;

    #[tauri::command]
    pub fn get_elements() -> String {
        if let Some(body) = element_repository::list_elements_from_simulator() {
            format!("{{\"response\":{value}}}", value = body)
        } else {
            format!(
                "{{\"response\":{value}}}",
                value = "{\"Could not fetch elements\"}"
            )
        }
    }

    #[tauri::command]
    pub fn put_files(
        input: data_manager::FilesUploadRequest,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> data_manager::SaveFilesResponseResult {  
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        data_manager::save_input_files(&input, conn)
    }

    #[tauri::command]
    pub fn get_files(
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> data_manager::GetFilesResponseResult {  
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        data_manager::list_files(conn)
    }
}
