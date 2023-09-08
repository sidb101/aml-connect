use crate::aml_core::network_manager::{self, SimulatorError, NetworkSimulator};
use serde_json::{self, Value};

pub fn list_elements_from_simulator() -> Result<serde_json::Value, SimulatorError> {
    let sc = network_manager::AmlSimulatorSidecar::new();
    let elements_json_str = network_manager::AmlSimulator::list_elements(&sc)?;
    let elements_json: Value = serde_json::from_str(elements_json_str.as_str())
        .map_err(|e| SimulatorError::JsonParseError(e.to_string()))?;
    Ok(elements_json)
}
