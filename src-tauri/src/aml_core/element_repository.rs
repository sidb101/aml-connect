use serde::{Deserialize, Serialize};
use serde_json;
use std::collections::HashMap;
use std::fs::File;
use std::io::BufReader;
use std::path::PathBuf;
use thiserror::Error;
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct ElementMetadata {
    pub short_description: String,
    pub long_description: String,
    pub type_name: String,
    pub terminals: HashMap<String, TerminalMetadata>,
    pub parameters: Option<HashMap<String, ParameterMetadata>>,
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
pub struct TerminalMetadata {
    pub description: String,
    pub direction: Option<TerminalDirection>,
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
pub struct ParameterMetadata {
    pub parameter_type: ParameterType,
    pub description: String,
    pub default: Option<String>,
    pub range_type: Option<RangeType>,
    pub range: Option<Vec<Option<String>>>,
    pub unit: Option<String>,
    pub ui_component: UIComponentType,
}

#[derive(Error, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum GetElementsError {
    #[error("Problem with directory or file access")]
    FileError(String),
    #[error("Element JSON is malformed")]
    MalformedJSON(String),
}

pub type GetElementsResponseResult = Result<HashMap<String, ElementMetadata>, GetElementsError>;

pub fn list_elements_from_simulator(file_path: &PathBuf) -> GetElementsResponseResult {
    let file = File::open(file_path).map_err(|e| GetElementsError::FileError(e.to_string()))?;
    let reader = BufReader::new(file);
    let res: HashMap<String, ElementMetadata> = serde_json::from_reader(reader)
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
        let mut file_path = std::path::PathBuf::new();
        file_path.push("resources");
        file_path.push("elements.json");

        // act
        let el_json_res = list_elements_from_simulator(&file_path);

        // assert
        assert!(el_json_res.is_ok());
        // println!("{}", serde_json::to_string_pretty(&el_json_res.unwrap()).unwrap());
    }
}
