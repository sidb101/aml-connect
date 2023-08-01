pub mod aml_core;

pub mod uicontroller {

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
    ) -> data_manager::SaveFilesResponse {
        data_manager::save_input_files(&input)
    }
}
