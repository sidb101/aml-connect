pub mod aml_core;

pub mod uicontroller {    
    #[tauri::command]
    pub fn greet(name: &str) -> String {
        crate::aml_core::filter_bank::do_stuff();
        format!("Hello, {}! You've been greeted from Rust!", name)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = uicontroller::greet("Sid");
        assert_eq!(result, "Hello, Sid! You've been greeted from Rust!");
    }
}