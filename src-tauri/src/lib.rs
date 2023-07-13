pub mod aml_core;
use tauri::api::process::Command;
use core::fmt::Error;

pub fn execute_sidecar_and_fetch_output(sidecar: &str, param: &str) -> Result<String, Error> {
    let sidecar_command_result = Command::new_sidecar(sidecar);
    let mut command_handle: Command;
    match sidecar_command_result {
        Ok(value) => {
            command_handle = value;
        }
        Err(error) => {
            println!("Error while loading command: {}", error);
            return;
        }
    };
    
    let command_handle_with_args = command_handle.args(["--get_elements"]);
    let exec_result = command_handle_with_args.output();

    match sidecar_

}

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
