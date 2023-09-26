
use std::{collections::HashMap, process::Output};

use anyhow::{ensure, Context, Result};
use mockall::{automock, predicate::*};
use tauri::api::process::Command;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use serde_json::json;

use thiserror::Error;

pub struct AmlSimulatorSidecar {
    pub sidecar_name: String,
}

#[derive(Error, Debug, Serialize, Deserialize, TS, PartialEq, Clone)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub enum SimulatorError {
    #[error("Failed to Build sidecar command")]
    CommandBuildError(String),
    #[error("Failed to execute sidecar command")]
    CommandExecutionError(String),
    #[error("Failed to parse sidecar output as JSON")]
    JsonParseError(String),
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct SimulateNetworkRequest {
    pub network: Network,
    pub input_file_path: String
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct SimulateNetworkResponse {
    pub response: HashMap<String, Vec<f64>>
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct Node {
    pub id: u64,
    pub name: String,
    pub parent_network_id: u64,
    pub terminal_ids: Vec<u64>,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct Network {
    pub id: u64,
    pub name: String,
    pub elements: Vec<Element>,
    pub nodes: Vec<Node>,

    pub creator_id: u64,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct Element{
    pub id: u64,
    pub parent_network_id: u64,

    pub type_name: String,
    pub element_type_params: Parameters,

    pub terminals: Vec<Terminal>,
    pub position: Position
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct Position {
    pub x: i64,
    pub y: i64,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct Terminal{
    pub id: u64,
    pub parent_element_id: u64,
    pub type_name: String,
    pub node_name: String,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub enum Parameters {
    Filter(Filter),
    FilterBank(FilterBank),
    Terminal(TerminalParams),
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct Filter{
    pub characteristic_frequency: f64,
    pub quality_factor: f64,
    pub filter_type: FilterType,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct FilterBank{
    pub band_frequencies: Vec<u64>,
    pub quality_factor: Vec<f64>,
    pub attack_rates: Vec<f64>,
    pub decay_rates: Vec<f64>,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct TerminalParams{
    pub hardware_pin: Option<String>,
    pub is_input: bool,
    pub is_output: bool,
    pub is_ac_coupled: Option<bool>,
    pub is_extern: Option<bool>
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub enum FilterType{
    Lpf1,
    Lpf2,
    Bpf2,
    Hpf1,
    Hpf2
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

impl AmlSimulator {
    pub fn from_json_string_to_obj() -> Result<()>{
        let result = AmlSimulator::from_obj_to_json_string();
        match result {
            Ok(json_string) => {
                // The Result was Ok, so you have the JSON string here.
                println!("JSON String: {}", json_string);
                let network: Network = serde_json::from_str(&json_string)?;
                let param = &network.elements[1].element_type_params;
                match param {
                    Parameters::Filter(filter) => {
                        println!("Ele1 {:?} | Ele2 {}", filter.filter_type, network.elements[0].type_name);
                    }
                    _ => {
                        // Handle other variants of Parameters here
                        println!("Not a Filter variant.");
                    }
                }
                

                
                Ok(())
            }
            Err(err) => {
                // The Result was an Err, handle the error here.
                eprintln!("Error: {}", err);
                Err(err)
            }
        }
    }
    
    pub fn from_json_to_string() -> String {
        let network = json!({
            "id": 101, //element ID
            "parent_network_id": 5000,
            "type_name": "Filter",
            "element_type_params": {
                "characteristic_frequency": 10,
                "quality_factor": 1,
                "filter_type": "Hpf2"
            },
            "positions": {
                "x": 100,
                "y": -100
            },
			"terminals": [{ //TODO: should this field be used for only terminal objects, and instead move this to parameters?
                "id": 2, //terminal ID
                "parent_element_id": 101, //is this field even necessary, considering its nested to above
                "type_name": "input", //TODO: could be hardware_pin, input, output, and more?
                "node_name": "in" //TODO: figure out diff between type_name, node_name
            }, {
                "id": 3, //terminal ID
                "parent_element_id": 101,
                "type_name": "output", 
                "node_name": "filter_out"
            }]
        });
        println!("{}", network.to_string());
        return network.to_string();
    }

    pub fn from_obj_to_json_string() -> Result<String> {
        let terminal1: Terminal = Terminal {
            id: 1,
            parent_element_id: 100,
            type_name: "input".to_string(),
            node_name: "in".to_string()
        };
        let element1 = Element {
            id: 100, //element ID
            parent_network_id: 5000,
            type_name: "Terminal".to_string(),
            element_type_params: Parameters::Terminal(
                TerminalParams { 
                    hardware_pin: None,
                    is_input: true, 
                    is_output: false, 
                    is_ac_coupled: None, 
                    is_extern: None ,
                }
            ),
            terminals: vec![terminal1],
            position: Position {
                x: 0,
                y: 0
            }
        };
        let terminal2 = Terminal {
            id: 2,
            parent_element_id: 101,
            type_name: "input".to_string(),
            node_name: "in".to_string()
        };
        let terminal3 = Terminal {
            id: 3,
            parent_element_id: 101,
            type_name: "output".to_string(),
            node_name: "filter_out".to_string()
        };
        let element2 = Element {
            id: 101, //element ID
            parent_network_id: 5000,
            type_name: "Filter".to_string(),
            element_type_params: Parameters::Filter(
                Filter {
                    characteristic_frequency: 1e3,
                    quality_factor: 1.0,
                    filter_type: FilterType::Hpf2,
                }
            ),
            terminals: vec![terminal2, terminal3],
            position: Position {
                x: 100,
                y: -100
            }
        };

        let node1 = Node {
            id: 2300,
            name: "in".to_string(),
            parent_network_id: 5000,
            terminal_ids: vec![1, 2],
        };
        let node2 = Node {
            id: 2301,
            name: "filter_out".to_string(),
            parent_network_id: 5000,
            terminal_ids: vec![2,3],
        };

    
        let network = Network {
            id: 5000,
            name: "sample_network".to_string(),
            elements: vec![element1, element2],
            nodes: vec![node1, node2],

            creator_id: 12345,
        };

        let json_string = serde_json::to_string_pretty(&network).unwrap();
        //println!("{}", json_string);
        Ok(json_string)
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
