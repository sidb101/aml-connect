use tauri::api::process::Command;
pub fn list_elements_from_simulator() -> String {
    let command_result = Command::new_sidecar("aspinity_wrapper")

    match command_result {
        Ok(value) => {
            let command_handle = value;
        }
        Err(error) => {
            println!("Error while loading command: {}", error);
        }
    };
    

    let mut command;
    match command_result {
        Command => 
    }

    // If you need to specify a failure, use an else:
    if let Command(command_result) = letter {
        println!("Matched {:?}!", i);
    } else {
        // Destructure failed. Change to the failure case.
        println!("Didn't match a number. Let's go with a letter!");
    }

    let output = Command::new_sidecar("aspinity_wrapper")
        .expect("Command Failed")
        .args(["--get_elements"])
        .output()
        .unwrap();
    output.stdout
}
