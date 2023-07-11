use tauri::api::process::{Command, CommandEvent};
pub fn do_stuff() {
    // println!("Test123");
    let (mut rx, mut child) = Command::new_sidecar("aspinity_test")
    .expect("failed to create `test` binary command")
    .spawn()
    .expect("Failed to spawn sidecar");

    tauri::async_runtime::spawn(async move {
        // read events such as stdout
        while let Some(event) = rx.recv().await {
            if let CommandEvent::Stdout(line) = event {
                // window
                // .emit("message", Some(format!("'{}'", line)))
                // .expect("failed to emit event");
                // write to stdin
                println!("{}", line);
                child.write("message from Rust\n".as_bytes()).unwrap();
            }
        }
    });
}