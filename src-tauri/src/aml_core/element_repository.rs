use crate::utils::Execute;

pub fn list_elements_from_simulator<E: Execute>(executable: &E) -> String {
    let result = executable.fetch_output(
        String::from("aspinity_wrapper"),
        vec!["--get_elements".to_string()],
    );
    match result {
        Ok(elements) => elements,
        Err(err) => format!("Failed to fetch Network Elements from Simulator: {}", err),
    }
}
