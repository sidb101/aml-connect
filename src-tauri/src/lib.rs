pub mod aml_core;

pub mod utils {
    use tauri::api::process::{Command, Output};

    pub trait Execute {
        fn execute_sidecar_and_fetch_output(
            &self,
            params: &[&str],
        ) -> Result<String, Box<dyn std::error::Error>>;
    }

    pub struct Sidecar {
        filename: String
    }

    impl Sidecar {
        pub fn new(filename: String) -> Sidecar {
            Sidecar {filename}
        }
    }

    impl Execute for Sidecar {
        fn execute_sidecar_and_fetch_output(
            &self,
            params: &[&str],
        ) -> Result<String, Box<dyn std::error::Error>> {
            let sidecar = &self.filename;
            let command: Command = Command::new_sidecar(sidecar)?.args(params);
            let command_output: Output = command.output()?;
            let stdout: String = command_output.stdout;
        
            match command_output.status.success() {
                true => Ok(stdout),
                false => Err(format!("Command failed with exit code: {:?}", command_output.status).into()),
            }
        }
    }

    

        
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
//     use double::*;

//     mock_trait!(
//         MockCommand,
//         new_sidecar(u64) -> f64);
    
//     impl new_sidecar for MockCommand {
//         mock_method!((&self, timestamp: u64) -> f64);
//     }


//     use 
//     mock_trait!(MockCommand, new_sidecar(String) -> Result<Self, Err>);
    
//     impl ProfitModel for MockCommand {
//         mock_method!(profit_at(&self, timestamp: u64) -> f64);
//     }

//     #[test]
//     fn it_works() {
//         let res = utils::execute_sidecar_and_fetch_output(sidecar, params);
//     }
// }
