pub mod aml_core;

pub mod utils {
    use mockall::predicate::*;
    use mockall::*;
    use tauri::api::process::Command;

    #[automock]
    pub trait Execute {
        fn fetch_output(&self, filename: String, params: Vec<String>) -> Result<String, String>;
    }

    pub struct Sidecar {}

    impl Execute for Sidecar {
        fn fetch_output(&self, filename: String, params: Vec<String>) -> Result<String, String> {
            let command_result = Command::new_sidecar(&filename);
            let command_with_args = match command_result {
                Ok(command) => command.args(&params),
                Err(_e) => {
                    return Err(format!(
                        "Could not build command for filename: {}",
                        &filename
                    ));
                }
            };

            let command_output_result = command_with_args.output();
            let command_output = match command_output_result {
                Ok(command_output) => command_output,
                Err(_e) => {
                    return Err("Failed to execute the command".to_string());
                }
            };

            Ok(command_output.stdout)
        }
    }
}

pub mod uicontroller {
    use crate::utils::Sidecar;

    #[tauri::command]
    pub fn get_elements() -> String {
        let sidecar: Sidecar = Sidecar {};
        crate::aml_core::element_repository::list_elements_from_simulator(&sidecar)
    }
}

#[cfg(test)]
mod tests {
    use crate::aml_core::element_repository;
    use crate::utils::*;
    use mockall::*;

    #[test]
    fn test_list_elements_calls_fetch_output_with_correct_params() {
        // arrange
        let expected_param1: String = String::from("aspinity_wrapper");
        let expected_param2: Vec<String> = vec!["--get_elements".to_string()];
        let expected_output: Result<String, String> = Ok("Dummy Elements".to_string());

        let mut mock = MockExecute::new();
        mock.expect_fetch_output()
            .with(
                predicate::eq(expected_param1),
                predicate::eq(expected_param2),
            )
            .times(1)
            .return_const(expected_output.clone());

        // act
        let output = element_repository::list_elements_from_simulator(&mock);

        //assert
        assert_eq!(expected_output.unwrap(), output);
    }
}
