pub mod aml_core;

pub mod uicontroller {
    use log::info;

    use crate::aml_core::element_repository::*;

    #[tauri::command]
    pub fn get_elements() -> String {
        info!("Getting elements from simulator");
        if let Some(body) = list_elements_from_simulator() {
            format!("{{\"response\":{value}}}", value = body)
        } else {
            format!(
                "{{\"response\":{value}}}",
                value = "{\"Could not fetch elements\"}"
            )
        }
    }
}
