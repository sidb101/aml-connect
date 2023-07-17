use crate::utils::{self, Execute};

pub fn list_elements_from_simulator() -> String {
    let sidecar = utils::Sidecar::new(String::from("aspinity_wrapper"));
    let result = sidecar.execute_sidecar_and_fetch_output(&["--get_elements"]);
    match result {
        Ok(elements) => elements,
        Err(err) => format!("Failed to fetch Network Elements from Simulator: {}", err),
    }
}
