pub mod aml_core;

pub mod uicontroller {
    use crate::aml_core::element_repository::*;
    use crate::aml_core::data_manager::*;
    use serde::{Deserialize, Serialize};
    use ts_rs::TS;

    
    #[derive(Debug, Serialize, Deserialize, TS)]
    #[ts(export)]
    enum DataSet{
        Testing,
        Validation,
        Training,
    }

    
    #[derive(Debug, Serialize, Deserialize, TS)]
    #[ts(export)]
    pub enum Error {
        FileNotFound,
        ProcessingError,
        // Add more error variants as needed.
    }

    
    #[derive(Debug, Serialize, Deserialize, TS)]
    #[ts(export)]
    pub struct File{
        file_abs_url: String,         //absolute file paths of input files (e.g. audio files)
        dataset_type: DataSet,
        is_uploaded: bool,
        file_rel_url: String,
    }

    
    #[derive(Debug, Serialize, Deserialize, TS)]
    #[ts(export)]
    pub struct InputJSON{
        proj_slug: String,
        input_files: Vec<File>,
        base_dir: String,       //absolute file path to the base directory for storing server side files
    }

    #[tauri::command]
    pub fn get_elements() -> String {
        if let Some(body) = list_elements_from_simulator() {
            format!("{{\"response\":{value}}}", value = body)
        } else {
            format!(
                "{{\"response\":{value}}}",
                value = "{\"Could not fetch elements\"}"
            )
        }
    }

    #[tauri::command]
    pub fn upload_input_files(mut input: InputJSON) -> Result<InputJSON, Error> {
    

        //TODO: validation of the list of input absolute file paths
        
        //TODO: copy to server side folder
        for file in &mut input.input_files {
            store_in_app_data(&file.file_abs_url, &input.base_dir);
        }
        //TODO: save metadata to db
        
        //TODO: return list of relative paths to server side files as OutputJSON
        
        //TEMP
        // Return the OutputJSON struct
        // for file in &mut input.input_files {
        //     file.file_rel_url = format!("uploads/{}", file.file_abs_url);
        //     file.is_uploaded = true;
        // }
    
    
        dbg!(&input);
    
        let success = true;
        if(success) {
            Ok(input)
        } else {
            Err(Error::ProcessingError)
        }
    
        
    }
}
