
use std::collections::HashMap;

use anyhow::Result;
use mockall::{automock, predicate::*};
use tauri::api::process::Command;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use serde_json::json;

use thiserror::Error;

pub struct AmlSimulatorSidecar {
    pub sidecar_name: String,
}

#[derive(Error, Debug, Serialize, Deserialize, TS, PartialEq, Clone)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum SimulatorError {
    #[error("Failed to Build sidecar command")]
    CommandBuildError(String),
    #[error("Failed to execute sidecar command")]
    CommandExecutionError(String),
    #[error("Failed to parse sidecar output as JSON")]
    JsonParseError(String),
}

#[derive(Error, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum RequestParseError {
    #[error("Failed to parse request to proper type")]
    MalformedRequest(String),
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to =  "../src/service/RemoteService/client/bindings/")]
pub struct SimulateNetworkRequest {
    pub network: NetworkVO,
    pub audio_file_path: String
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct SimulateNetworkResponse {
    pub response: HashMap<String, Vec<f64>>
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct Node {
    pub id: String,
    pub name: String,
    pub parent_network_id: Option<u64>,
    pub terminal_ids: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct NetworkVO {
    //id is optional so that frontend doesn't need to send an id to backend
    //if backend notices id is null, this means backend needs to generate an
    //id for this network (and propagage to corresponding parent_network_id fields)
    pub id: Option<u64>, 
    pub name: String,
    pub elements: Vec<ElementVO>,
    pub nodes: Vec<Node>,

    pub creator_id: u64,
}

impl NetworkVO {
    fn to_network(self) -> Result<Network, RequestParseError> {
        let mut elements: Vec<Element> = Vec::new();
        for element in self.elements {
            elements.push( element.to_element()?);
        }

        Ok(Network {
            id: self.id,
            name: self.name,
            elements: elements,
            nodes: self.nodes,
            creator_id: self.creator_id,
        })
    }
}

//// Not exported dueto NetworkVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct Network {
    //id is optional so that frontend doesn't need to send an id to backend
    //if backend notices id is null, this means backend needs to generate an
    //id for this network (and propagage to corresponding parent_network_id fields)
    pub id: Option<u64>, 
    pub name: String,
    pub elements: Vec<Element>,
    pub nodes: Vec<Node>,

    pub creator_id: u64,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct ElementVO{
    pub id: String,
    pub parent_network_id: Option<u64>,
    pub name: String,

    pub type_name: String,
    pub element_type_params: HashMap<String, HashMap<String, String>>,

    pub terminals: Vec<Terminal>,
    pub position: Position
}

impl ElementVO {
    fn to_element(self) -> Result<Element, RequestParseError> {
        let mut params: Params = match self.type_name.as_str() {
            "AcDiff" => Parameters::AcDiff(
                AcDiffParams.from_hashmap(self.element_type_params.get(&"AcDiff"))?,
            ),
            "AsymmetricIntegrator" => Parameters::AsymmetricIntegrator(
                AsymmetricIntegratorParams.from_hashmap(self.element_type_params.get(&"AsymmetricIntegrator"))?,
            ),
            // "Comparator" => Parameters::Comparator(
            //     ComparatorParams.from_hashmap(self.element_type_params.get(&"Comparator"))?,
            // ),
            // "Filter" => Parameters::Filter(
            //     FilterParams.from_hashmap(self.element_type_params.get(&"Filter"))?,
            // ),
            // "Filterbank" => Parameters::Filterbank(
            //     FilterbankParams.from_hashmap(self.element_type_params.get(&"Filterbank"))?,
            // ),
            // "GainOpamp" => Parameters::GainOpamp(
            //     GainOpampParams.from_hashmap(self.element_type_params.get(&"GainOpamp"))?,
            // ),
            // "LookupTable" => Parameters::LookupTable(
            //     LookupTableParams.from_hashmap(self.element_type_params.get(&"LookupTable"))?,
            // ),
            // "DelayFlipFlop" => Parameters::DelayFlipFlop,
            // "Multiplier" => Parameters::Multiplier(
            //     MultiplierParams.from_hashmap(self.element_type_params.get(&"Multiplier"))?,
            // ),
            // "Mux2" => Parameters::Mux2,
            // "NeuralNet" => Parameters::NeuralNet(
            //     NeuralNetParams.from_hashmap(self.element_type_params.get(&"NeuralNet"))?,
            // ),
            // "PeakDetector" => Parameters::PeakDetector(
            //     PeakDetectorParams.from_hashmap(self.element_type_params.get(&"PeakDetector"))?,
            // ),
            // "PGA" => Parameters::PGA(
            //     PGAParams.from_hashmap(self.element_type_params.get(&"PGA"))?,
            // ),
            // "SynthesizedFilter" => Parameters::SynthesizedFilter(
            //     SynthesizedFilterParams.from_hashmap(self.element_type_params.get(&"SynthesizedFilter"))?,
            // ),
            // "Terminal" => Parameters::Terminal(
            //     TerminalParams.from_hashmap(self.element_type_params.get(&"Terminal"))?,
            // ),
        }

        Ok(Element {
            id: self.id,
            parent_network_id: self.parent_network_id,
            name: self.name,
            type_name: self.type_name,
            element_type_params: params,
            terminals: self.terminals,
            position: self.position,
        })
    }
}

//// Not exported dueto ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct Element{
    pub id: String,
    pub parent_network_id: Option<u64>,
    pub name: String,

    pub type_name: String,
    pub element_type_params: Parameters,

    pub terminals: Vec<Terminal>,
    pub position: Position
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct Position {
    pub x: i32,
    pub y: i32,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct Terminal{
    pub id: String,
    pub parent_element_id: String,
    pub type_name: String,
    pub node_name: String,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum Parameters {
    AcDiff(AcDiffParams),
    AsymmetricIntegrator(AsymmetricIntegratorParams),
    Comparator(ComparatorParams),
    Filter(FilterParams),
    Filterbank(FilterbankParams),
    GainOpamp(GainOpampParams),
    LookupTable(LookupTableParams),
    DelayFlipFlop, //has no params
    Multiplier(MultiplierParams),
    Mux2, //has no params
    NeuralNet(NeuralNetParams),
    PeakDetector(PeakDetectorParams),
    PGA(PGAParams),
    SynthesizedFilter(SynthesizedFilterParams),
    Terminal(TerminalParams),
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct AcDiffParams{
    pub gain: f64,
    pub bias: Option<f64>,
}

impl AcDiffParams {
    fn from_hashmap(params: HashMap<String, String>) -> Result<Self, RequestParseError> {
        let gain = params.get("gain")
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Missing key: gain".to_string()))?
            .parse::<f64>()
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Invalid value for key: gain (expected - float)".to_string()))?;
        let bias = match params.get("bias") {
            Some(bias) => Some(
                bias.parse::<f64>().unwrap().map_err(|_| RequestParseError::MalformedRequest("Invalid value for key: bias (expected - float)".to_string()))?
            ),
            None => None,
        };

        Ok(AcDiffParams {
            gain: gain,
            bias: bias,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct AsymmetricIntegratorParams{
    pub up: f64,
    pub down: f64,
    pub up_down_type: UpDownType,
    pub comparator_enable: bool,
    pub buffer_gm: Option<f64>,
    pub capacitor_configuration: Option<CapacitorConfiguration>,
    pub parasitic_capacitance: Option<f64>,
    pub unit_capacitance: Option<f64>,
}

impl AsymmetricIntegratorParams {
    fn from_hashmap(params: HashMap<String, String>) -> Result<Self, RequestParseError> {
        let up = params.get("up")
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Missing key: up".to_string()))?
            .parse::<f64>()
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Invalid value for key: up (expected - float)".to_string()))?;
        let down = params.get("down")
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Missing key: down".to_string()))?
            .parse::<f64>()
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Invalid value for key: down (expected - float)".to_string()))?;
        let up_down_type = match params.get("up_down_type")
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Missing key: up_down_type"))?
            .as_str() {
                "Rate" => UpDownType::Rate,
                "Hang" => UpDownType::Hang,
                _ => return Err(RequestParseError::MalformedRequest("Invalid value for key: up_down_type (expected - Rate or Hang)".to_string())),
            }
        }
        let comparator_enable = params.get("comparator_enable")
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Missing key: comparator_enable".to_string()))?
            .parse::<bool>()
            .unwrap().map_err(|_| RequestParseError::MalformedRequest("Invalid value for key: comparator_enable (expected - bool)".to_string()))?;
        
        Ok(AsymmetricIntegratorParams {
                up: up,
                down: down,
                up_down_type: up_down_type,
                comparator_enable: comparator_enable,
        })
    }

}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct ComparatorParams{
    pub threshold: f64,
    pub hysteresis_voltage: Option<f64>,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct FilterParams{
    pub characteristic_frequency: f64,
    pub quality_factor: f64,
    pub filter_type: FilterType,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct FilterbankParams{
    pub band_frequencies: Vec<u64>,
    pub quality_factor: Vec<f64>,
    pub attack_rates: Vec<f64>,
    pub decay_rates: Vec<f64>,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct GainOpampParams{
    pub gain_mode: GainOpampMode,
    //pub opamp_implementation: OpampType,  //not supported as it is not exposed
    pub feedback_cap_count: f64,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct LookupTableParams{
    pub expression: String
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct MultiplierParams{
    pub slope: f64,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct NeuralNetParams{
    pub weights: Vec<f64>,
    pub biases: Vec<f64>,
    pub activation_function: Vec<ActivationFunction>,
    pub activation_scale: Option<f64>,
    pub input_compress_scale: Option<f64>,
    pub input_compression_type: Option<ActivationFunction>,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct PeakDetectorParams{
    pub atk: f64,
    pub dec: f64,
    pub model_version: ModelVersion,
    pub buff: Option<f64>,
    pub parasitic_ratio: Option<f64>,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct PGAParams{
    pub Av1: f64,
    pub Av2: f64,
    pub den: Option<f64>,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct SynthesizedFilterParams{
    pub coefficients: Vec<Vec<f64>>
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct TerminalParams{
    pub hardware_pin: Option<String>,
    pub is_input: bool,
    pub is_output: bool,
    pub is_ac_coupled: Option<bool>,
    pub is_extern: Option<bool>
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum CapacitorConfiguration{
    Internal,
    Internal2x,
    Internal3x,
    Internal4x,
    Internal4x_2xS4_S3,
    Internal4x_2xS4_S3_S2,
    Internal4x_S4,
    ParasiticOnly,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum FilterType{
    lpf1,
    lpf2,
    bpf2,
    hpf1,
    hpf2
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum GainOpampMode{
    Noninverting1x,
    Noninverting11x,
    Inverting2x,
    Inverting4x,
    Inverting10x,
    Inverting20x,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum OpampType{
    StageZero,
    Pin,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum ModelVersion{
    FirstOrder,
    SecondOrder,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum UpDownType{
    Rate,
    Hang
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum ActivationFunction{
    Tanh,
    Sigmoid,
    ReLU,
    Linear
}

impl AmlSimulatorSidecar {
    pub fn new() -> Self {
        AmlSimulatorSidecar {
            sidecar_name: String::from("aspinity_wrapper"),
        }
    }

    fn get_sidecar_name(&self) -> String {
        self.sidecar_name.clone()
    }
}

#[automock]
pub trait ExecutableSidecar {
    fn get_output(&self, params: Vec<String>) -> Result<String, SimulatorError>;
}

impl ExecutableSidecar for AmlSimulatorSidecar {
    fn get_output(&self, params: Vec<String>) -> Result<String, SimulatorError> {
        let command_output = Command::new_sidecar(self.get_sidecar_name())
            .map_err(|e| SimulatorError::CommandBuildError(e.to_string()))?
            .args(&params)
            .output()
            .map_err(|e| SimulatorError::CommandExecutionError(e.to_string()))?;
        
        Ok(command_output.stdout)
    }
}

pub trait NetworkSimulator {
    fn list_elements<E: ExecutableSidecar>(sidecar: &E) -> Result<String, SimulatorError>;
}

pub struct AmlSimulator {}

impl NetworkSimulator for AmlSimulator {
    fn list_elements<E: ExecutableSidecar>(sidecar: &E) -> Result<String, SimulatorError> {
        let params = vec!["--get_elements".to_string()];
        sidecar.get_output(params)
    }
}

#[cfg(test)]
mod tests {
    use crate::aml_core::network_manager::*;
    use mockall::*;

    #[test]
    fn test_aml_simulator_sidecar_name() {
        // arrange
        let obj = AmlSimulatorSidecar::new();
        // act
        let sidecar_file: String = obj.get_sidecar_name();
        // assert
        assert_eq!(sidecar_file, "aspinity_wrapper".to_string());
    }

    #[test]
    fn test_list_elements_uses_correct_params() {
        // arrange
        let expected_param: Vec<String> = vec!["--get_elements".to_string()];
        let expected_output: String = String::from("Dummy output");
        let expected_output_result: Result<String, SimulatorError> = Ok(expected_output.clone());

        let mut mock = MockExecutableSidecar::new();
        mock.expect_get_output()
            .with(predicate::eq(expected_param))
            .times(1)
            .return_once(move |_| expected_output_result);

        // act
        let output = AmlSimulator::list_elements(&mock);

        //assert
        assert_eq!(Ok(expected_output), output);
    }
}
