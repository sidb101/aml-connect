
use anyhow::Result;
use mockall::{automock, predicate::*};
use tauri::api::process::Command;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use thiserror::Error;

pub struct AmlSimulatorSidecar {
    pub sidecar_name: String,
}

#[derive(Error, Debug, Serialize, Deserialize, TS, PartialEq, Clone)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum SimulatorError {
    #[error("Failed to Build sidecar command")]
    CommandBuildError(String),
    #[error("Failed to execute sidecar command")]
    CommandExecutionError(String),
    #[error("Failed to parse sidecar output as JSON")]
    JsonParseError(String),
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
    fn get_output(&self, params: Vec<String>) -> Result<String, SimulatorError>;
}

impl ExecutableSidecar for AmlSimulatorSidecar {
    fn get_output(&self, params: Vec<String>) -> Result<String, SimulatorError> {
        let command_output = Command::new_sidecar(self.get_sidecar_name())
            .map_err(|e| SimulatorError::CommandBuildError(e.to_string()))?
            .args(&params)
            .output()
            .map_err(|e| SimulatorError::CommandExecutionError(e.to_string()))?;
        
        Ok(command_output.stdout)
    }
}

pub trait NetworkSimulator {
    fn list_elements<E: ExecutableSidecar>(sidecar: &E) -> Result<String, SimulatorError>;
}

pub struct AmlSimulator {}

impl NetworkSimulator for AmlSimulator {
    fn list_elements<E: ExecutableSidecar>(sidecar: &E) -> Result<String, SimulatorError> {
        let params = vec!["--get_elements".to_string()];
        sidecar.get_output(params)
    }
}

#[cfg(test)]
mod tests {
    use crate::aml_core::network_manager::*;
    use mockall::*;

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
        let expected_output: String = String::from("Dummy output");
        let expected_output_result: Result<String, SimulatorError> = Ok(expected_output.clone());

        let mut mock = MockExecutableSidecar::new();
        mock.expect_get_output()
            .with(predicate::eq(expected_param))
            .times(1)
            .return_once(move |_| expected_output_result);

        // act
        let output = AmlSimulator::list_elements(&mock);

        //assert
        assert_eq!(Ok(expected_output), output);
    }
}
