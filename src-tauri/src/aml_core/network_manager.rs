use mockall::{automock, predicate::*};
use tauri::api::process::Command;
use tauri::Error;

pub struct AmlSimulatorSidecar {
    sidecar_name: String,
}

impl AmlSimulatorSidecar {
    pub fn new() -> Self {
        AmlSimulatorSidecar {
            sidecar_name: String::from("aspinity_wrapper"),
        }
    }

    fn get_sidecar_name(&self) -> String {
        self.sidecar_name.clone()
    }
}

#[automock]
pub trait ExecutableSidecar {
    fn get_output(&self, params: Vec<String>) -> Result<String, Error>;
}

impl ExecutableSidecar for AmlSimulatorSidecar {
    fn get_output(&self, params: Vec<String>) -> Result<String, Error> {
        let command_result = Command::new_sidecar(self.get_sidecar_name());
        let command = match command_result {
            Ok(cmd) => cmd,
            Err(e) => {
                return Err(e);
            }
        };
        let command_output = command.args(&params).output();
        match command_output {
            Ok(output) => Ok(output.stdout),
            Err(e) => {
                return Err(tauri::Error::FailedToExecuteApi(e));
            }
        }
    }
}

pub trait NetworkSimulator {
    fn list_elements<E: ExecutableSidecar>(&self, sidecar: &E) -> Option<String>;
}

pub struct AmlSimulator {}

impl NetworkSimulator for AmlSimulator {
    fn list_elements<E: ExecutableSidecar>(&self, sidecar: &E) -> Option<String> {
        let params = vec!["--get_elements".to_string()];
        let res = sidecar.get_output(params);
        match res {
            Ok(str) => Some(str),
            Err(e) => {
                eprintln!("Failed to list elements: {}", e);
                None
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::aml_core::network_manager::*;
    use mockall::*;
    use tauri::Error;

    #[test]
    fn test_aml_simulator_sidecar_name() {
        // arrange
        let obj = AmlSimulatorSidecar::new();
        // act
        let sidecar_file: String = obj.get_sidecar_name();
        // assert
        assert_eq!(sidecar_file, "aspinity_wrapper".to_string());
    }

    #[test]
    fn test_list_elements_uses_correct_params() {
        // arrange
        let expected_param: Vec<String> = vec!["--get_elements".to_string()];
        let expected_output: Option<String> = Some("Dummy output".to_string());
        let expected_output_result: Result<String, Error> = Ok(expected_output.clone().unwrap());

        let mut mock = MockExecutableSidecar::new();
        mock.expect_get_output()
            .with(predicate::eq(expected_param))
            .times(1)
            .return_once(move |_| expected_output_result);

        let sim = AmlSimulator {};

        // act
        let output = sim.list_elements(&mock);

        //assert
        assert_eq!(expected_output, output);
    }
}
