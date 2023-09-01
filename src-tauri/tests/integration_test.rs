use aml_connect::aml_core::network_manager::{self, SimulatorError, NetworkSimulator};
use serde_json::{self, Value};

#[test]
fn test_list_elements_from_simulator() {
    
    let mut sc = network_manager::AmlSimulatorSidecar::new();
    sc.sidecar_name = String::from("../aspinity_wrapper");
    let elements_json_str = network_manager::AmlSimulator::list_elements(&sc)
        .unwrap();
    let elements_json: Value = serde_json::from_str(elements_json_str.as_str())
        .map_err(|e| SimulatorError::JsonParseError(e.to_string()))
        .unwrap();

    // check that one of the keys "AcDiff" exist in elements_json
    assert!(elements_json["AcDiff"].is_object());
}


