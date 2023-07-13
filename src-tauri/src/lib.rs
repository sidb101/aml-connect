pub mod aml_core;

pub mod uicontroller {    
    #[tauri::command]
    pub fn get_elements() -> String {
        crate::aml_core::element_repository::list_elements_from_simulator()
    }
}

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         assert(true);
//     }
// }