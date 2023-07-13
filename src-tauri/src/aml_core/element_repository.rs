use tauri::api::process::Command;
pub fn list_elements_from_simulator() -> String {
    let output = Command::new_sidecar("aspinity_wrapper").expect("Command Failed").args(["--get_elements"]).output().unwrap();
    output.stdout
}