
use serde_json;
use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use std::fs::File;
use std::io::BufReader;
use std::env;
use thiserror::Error;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct ElementMetadata {
    pub short_description: String,
    pub long_description: String,
    pub type_name: String,
    pub terminals: HashMap<String, TerminalMetadata>,
    pub parameters: HashMap<String, ParameterMetadata>
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum TerminalDirection {
    #[serde(rename = "input")]
    Input,
    #[serde(rename = "output")]
    Output,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct TerminalMetadata{
    pub description: String,
    pub direction: TerminalDirection,
    pub default: Option<String>,
    pub dc_range: Option<String>,
    pub ac_range: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum ParameterType {
    #[serde(rename = "number")]
    Number,
    #[serde(rename = "string")]
    String,
    #[serde(rename = "boolean")]
    Boolean,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum RangeType {
    #[serde(rename = "discrete")]
    Discrete,
    #[serde(rename = "interval")]
    Interval,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum UIComponentType {
    #[serde(rename = "checkbox")]
    Checkbox,
    #[serde(rename = "dropdown")]
    Dropdown,
    #[serde(rename = "textbox")]
    Textbox,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct ParameterMetadata{
    pub parameter_type: ParameterType,
    pub description: String,
    pub default: Option<String>,
    pub range_type: Option<RangeType>,
    pub range: Option<Vec<Option<String>>>,
    pub unit: Option<String>,
    pub ui_component: UIComponentType
}

#[derive(Error, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum GetElementsError {
    #[error("Problem with directory or file access")]
    OSError,
    #[error("Element JSON is malformed")]
    MalformedJSON(String),
}

pub type GetElementsResponseResult = Result<HashMap<String, ElementMetadata>, GetElementsError>;

pub fn list_elements_from_simulator() -> GetElementsResponseResult {
    let current_dir = env::current_dir().map_err(|_| GetElementsError::OSError)?;
    let file_path = current_dir.join("src")
        .join("aml_core")
        .join("elements.json");
    let file = File::open(file_path).map_err(|_| GetElementsError::OSError)?;
    let reader = BufReader::new(file);
    let res: HashMap<String, ElementMetadata> = 
        serde_json::from_reader(reader)
        .map_err(|e| GetElementsError::MalformedJSON(e.to_string()))?;
    Ok(res)
}

// tests
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_metadata_load_from_json() {
        // arrange
        // act
        let el_json_res = list_elements_from_simulator().unwrap();
        
        // assert
        // assert!( el_json_res.is_ok() );
        // println!("{}", serde_json::to_string_pretty(&el_json_res.unwrap()).unwrap());        
    }

}