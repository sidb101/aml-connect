pub mod aml_core;

pub mod uicontroller {
    use crate::aml_core::file_data_manager;
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
    pub fn create_project(
        req: project_manager::CreateProjectRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> project_manager::CreateProjectResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        project_manager::create_project::create_project(&req, &app_dir, conn)
    }

    #[tauri::command]
    pub fn delete_project(
        req: project_manager::DeleteProjectRequest,
        app_dir: State<std::path::PathBuf>,
        db_conn: State<Pool<ConnectionManager<SqliteConnection>>>,
    ) -> project_manager::DeleteProjectResponseResult {
        let conn = &mut db_conn.get().expect("Unable to get db connection");
        project_manager::delete_project::delete_project(&req, &app_dir, conn)
    }
}
