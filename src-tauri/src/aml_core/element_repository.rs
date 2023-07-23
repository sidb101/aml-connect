use crate::aml_core::network_manager::*;

pub fn list_elements_from_simulator() -> Option<String> {
    let sc = AmlSimulatorSidecar::new();
    let sim = AmlSimulator {};
    sim.list_elements(&sc)
}
