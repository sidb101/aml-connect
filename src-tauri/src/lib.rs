pub mod aml_core;

pub mod uicontroller {
    use serde_json::{self, Value};

    use crate::aml_core::element_repository;
    use crate::aml_core::network_manager::SimulatorError;

    #[tauri::command]
    pub fn get_elements() -> Result<serde_json::Value, SimulatorError> {
        let elements_json = element_repository::list_elements_from_simulator()?;
        Ok(elements_json)
    }
}
