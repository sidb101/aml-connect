use std::{collections::HashMap, path::PathBuf};

use anyhow::Result;
use log::debug;
use mockall::{automock, predicate::*};
use serde::{Deserialize, Serialize};
use tauri::api::process::Command;
use ts_rs::TS;

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
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct SimulateNetworkRequest {
    pub network: NetworkVO,
    pub audio_file_path: String,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct SimulateNetworkResponse {
    pub response: HashMap<String, Vec<f64>>,
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

fn value_to_vec(value: &serde_json::Value) -> Result<Vec<ElementVO>, RequestParseError> {
    let elements = value
        .as_array()
        .ok_or(RequestParseError::MalformedRequest(
            "Invalid value for key: elements (expected array)".to_string(),
        ))?
        .iter()
        .map(|element| {
            serde_json::from_value(element.clone())
                .map_err(|_| RequestParseError::MalformedRequest("Invalid element".to_string()))
        })
        .collect::<Result<Vec<ElementVO>, RequestParseError>>()?;

    Ok(elements)
}

impl NetworkVO {
    fn from_json(json_file_path: PathBuf) -> Result<Self, RequestParseError> {
        let json_file = std::fs::File::open(json_file_path).unwrap();
        let json_reader = std::io::BufReader::new(json_file);
        let network_json: serde_json::Value = serde_json::from_reader(json_reader).unwrap();
        let network_hashmap = network_json.get("network").unwrap();

        println!("checkkk {}", network_hashmap
            .get("id")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: id".to_string(),
            ))?
            .as_str()
            .ok_or(RequestParseError::MalformedRequest(
                "Invalid value for key: id (expected - string)".to_string(),
            ))?
            .parse::<u64>()
            .unwrap()
        );

        Ok(NetworkVO {
            id: Some(
                network_hashmap
                .get("id")
                .ok_or(RequestParseError::MalformedRequest(
                    "Missing key: id".to_string(),
                ))?
                .as_str()
                .ok_or(RequestParseError::MalformedRequest(
                    "Invalid value for key: id (expected - string)".to_string(),
                ))?
                .parse::<u64>()
                .map_err(|_| RequestParseError::MalformedRequest(
                    "Invalid value for key: id (expected - u64)".to_string(),
                ))?
            ),
            name: network_hashmap
                .get("name")
                .ok_or(RequestParseError::MalformedRequest(
                    "Missing key: name".to_string(),
                ))
                .unwrap()
                .to_string(),
            elements: value_to_vec(network_hashmap.get("elements").ok_or(
                RequestParseError::MalformedRequest("Missing key: elements".to_string()),
            )?)?,
            nodes: vec![],
            creator_id: network_hashmap
                .get("creator_id")
                .ok_or(RequestParseError::MalformedRequest(
                    "Missing key: creator_id".to_string(),
                ))
                .unwrap()
                .to_string()
                .parse::<u64>()
                .map_err(|_| {
                    RequestParseError::MalformedRequest(
                        "Invalid value for key: creator_id (expected - u64)".to_string(),
                    )
                })?,
        })
    }

    fn to_network(self) -> Result<Network, RequestParseError> {
        let mut elements: Vec<Element> = Vec::new();
        for element in self.elements {
            elements.push(element.to_element()?);
        }

        Ok(Network {
            id: self.id,
            name: self.name,
            elements: elements,
            nodes: vec![],
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
pub struct ElementVO {
    pub id: String,
    pub parent_network_id: Option<u64>,
    pub name: String,

    pub type_name: String,
    pub element_type_params: HashMap<String, HashMap<String, String>>,

    pub terminals: Vec<Terminal>,
    pub position: Position,
}

impl ElementVO {
    fn from_serde_value(element_value: serde_json::Value) -> Result<Self, RequestParseError> {
        serde_json::from_value(element_value).map_err(|_| {
            RequestParseError::MalformedRequest(
                "Invalid value for key: element (expected - ElementVO)".to_string(),
            )
        })
    }

    fn to_element(self) -> Result<Element, RequestParseError> {
        let params: Parameters = match self.type_name.as_str() {
            "AcDiff" => Parameters::AcDiff(AcDiffParams::from_hashmap(
                self.element_type_params.get("AcDiff").ok_or(
                    RequestParseError::MalformedRequest("Missing key: AcDiff".to_string()),
                )?,
            )?),
            "AsymmetricIntegrator" => {
                Parameters::AsymmetricIntegrator(AsymmetricIntegratorParams::from_hashmap(
                    self.element_type_params.get("AsymmetricIntegrator").ok_or(
                        RequestParseError::MalformedRequest(
                            "Missing key: AsymmetricIntegrator".to_string(),
                        ),
                    )?,
                )?)
            }
            "Comparator" => Parameters::Comparator(ComparatorParams::from_hashmap(
                self.element_type_params.get("Comparator").ok_or(
                    RequestParseError::MalformedRequest("Missing key: Comparator".to_string()),
                )?,
            )?),
            "Filter" => Parameters::Filter(FilterParams::from_hashmap(
                self.element_type_params.get("Filter").ok_or(
                    RequestParseError::MalformedRequest("Missing key: Filter".to_string()),
                )?,
            )?),
            "Filterbank" => Parameters::Filterbank(FilterbankParams::from_hashmap(
                self.element_type_params.get("Filterbank").ok_or(
                    RequestParseError::MalformedRequest("Missing key: Filterbank".to_string()),
                )?,
            )?),
            "GainOpamp" => Parameters::GainOpamp(GainOpampParams::from_hashmap(
                self.element_type_params.get("GainOpamp").ok_or(
                    RequestParseError::MalformedRequest("Missing key: GainOpamp".to_string()),
                )?,
            )?),
            "LookupTable" => Parameters::LookupTable(LookupTableParams::from_hashmap(
                self.element_type_params.get("LookupTable").ok_or(
                    RequestParseError::MalformedRequest("Missing key: LookupTable".to_string()),
                )?,
            )?),
            "DelayFlipFlop" => Parameters::DelayFlipFlop,
            "Multiplier" => Parameters::Multiplier(MultiplierParams::from_hashmap(
                self.element_type_params.get("Multiplier").ok_or(
                    RequestParseError::MalformedRequest("Missing key: Multiplier".to_string()),
                )?,
            )?),
            "Mux2" => Parameters::Mux2,
            "NeuralNet" => Parameters::NeuralNet(NeuralNetParams::from_hashmap(
                self.element_type_params.get("NeuralNet").ok_or(
                    RequestParseError::MalformedRequest("Missing key: NeuralNet".to_string()),
                )?,
            )?),
            "PeakDetector" => Parameters::PeakDetector(PeakDetectorParams::from_hashmap(
                self.element_type_params.get("PeakDetector").ok_or(
                    RequestParseError::MalformedRequest("Missing key: PeakDetector".to_string()),
                )?,
            )?),
            "PGA" => {
                Parameters::PGA(PGAParams::from_hashmap(
                    self.element_type_params.get("PGA").ok_or(
                        RequestParseError::MalformedRequest("Missing key: PGA".to_string()),
                    )?,
                )?)
            }
            "SynthesizedFilter" => {
                Parameters::SynthesizedFilter(SynthesizedFilterParams::from_hashmap(
                    self.element_type_params.get("SynthesizedFilter").ok_or(
                        RequestParseError::MalformedRequest(
                            "Missing key: SynthesizedFilter".to_string(),
                        ),
                    )?,
                )?)
            }
            "Terminal" => Parameters::Terminal(TerminalParams::from_hashmap(
                self.element_type_params.get("Terminal").ok_or(
                    RequestParseError::MalformedRequest("Missing key: Terminal".to_string()),
                )?,
            )?),
            &_ => {
                return Err(RequestParseError::MalformedRequest(
                    "Invalid element type".to_string(),
                ))
            }
        };

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
pub struct Element {
    pub id: String,
    pub parent_network_id: Option<u64>,
    pub name: String,

    pub type_name: String,
    pub element_type_params: Parameters,

    pub terminals: Vec<Terminal>,
    pub position: Position,
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
pub struct Terminal {
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
pub struct AcDiffParams {
    pub gain: f64,
    pub bias: Option<f64>,
}

impl AcDiffParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let gain = params
            .get("gain")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: gain".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: gain (expected - float)".to_string(),
                )
            })?;
        let bias = match params.get("bias") {
            Some(bias) => Some(bias.parse::<f64>().map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: bias (expected - float)".to_string(),
                )
            })?),
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
pub struct AsymmetricIntegratorParams {
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
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let up = params
            .get("up")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: up".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: up (expected - float)".to_string(),
                )
            })?;
        let down = params
            .get("down")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: down".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: down (expected - float)".to_string(),
                )
            })?;
        let up_down_type = match params
            .get("up_down_type")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: up_down_type".to_string(),
            ))?
            .as_str()
        {
            "Rate" => UpDownType::Rate,
            "Hang" => UpDownType::Hang,
            _ => {
                return Err(RequestParseError::MalformedRequest(
                    "Invalid value for key: up_down_type (expected - Rate or Hang)".to_string(),
                ))
            }
        };

        let comparator_enable = params
            .get("comparator_enable")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: comparator_enable".to_string(),
            ))?
            .parse::<bool>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: comparator_enable (expected - bool)".to_string(),
                )
            })?;

        Ok(AsymmetricIntegratorParams {
            up: up,
            down: down,
            up_down_type: up_down_type,
            comparator_enable: comparator_enable,
            buffer_gm: None,
            capacitor_configuration: None,
            parasitic_capacitance: None,
            unit_capacitance: None,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct ComparatorParams {
    pub threshold: f64,
    pub hysteresis_voltage: Option<f64>,
}

impl ComparatorParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let threshold = params
            .get("threshold")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: threshold".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: threshold (expected - float)".to_string(),
                )
            })?;
        let hysteresis_voltage = match params.get("hysteresis_voltage") {
            Some(hysteresis_voltage) => Some(hysteresis_voltage.parse::<f64>().map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: hysteresis_voltage (expected - float)".to_string(),
                )
            })?),
            None => None,
        };

        Ok(ComparatorParams {
            threshold: threshold,
            hysteresis_voltage: hysteresis_voltage,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct FilterParams {
    pub characteristic_frequency: f64,
    pub quality_factor: f64,
    pub filter_type: FilterType,
}

impl FilterParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let characteristic_frequency = params
            .get("characteristic_frequency")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: characteristic_frequency".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: characteristic_frequency (expected - float)"
                        .to_string(),
                )
            })?;
        let quality_factor = params
            .get("quality_factor")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: quality_factor".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: quality_factor (expected - float)".to_string(),
                )
            })?;
        let filter_type =
            match params
                .get("filter_type")
                .ok_or(RequestParseError::MalformedRequest(
                    "Missing key: filter_type".to_string(),
                ))?
                .as_str()
            {
                "lpf1" => FilterType::lpf1,
                "lpf2" => FilterType::lpf2,
                "bpf2" => FilterType::bpf2,
                "hpf1" => FilterType::hpf1,
                "hpf2" => FilterType::hpf2,
                _ => return Err(RequestParseError::MalformedRequest(
                    "Invalid value for key: filter_type (expected - lpf1, lpf2, bpf2, hpf1, hpf2)"
                        .to_string(),
                )),
            };

        Ok(FilterParams {
            characteristic_frequency: characteristic_frequency,
            quality_factor: quality_factor,
            filter_type: filter_type,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct FilterbankParams {
    pub band_frequencies: Vec<u64>,
    pub quality_factor: Vec<f64>,
    pub attack_rates: Vec<f64>,
    pub decay_rates: Vec<f64>,
}

fn parse_float_vector(input: &str) -> Option<Vec<f64>> {
    // Remove leading and trailing whitespaces and square brackets
    let trimmed_input = input.trim_start_matches('[').trim_end_matches(']');

    // Split the input string by commas
    let values: Vec<&str> = trimmed_input.split(',').collect();

    // Parse each value as a float and collect into a Vec<f64>
    let result: Option<Vec<f64>> = values
        .into_iter()
        .map(|v| v.trim().parse::<f64>().ok())
        .collect();

    result
}

fn parse_int_vector(input: &str) -> Option<Vec<u64>> {
    // Remove leading and trailing whitespaces and square brackets
    let trimmed_input = input.trim_start_matches('[').trim_end_matches(']');

    // Split the input string by commas
    let values: Vec<&str> = trimmed_input.split(',').collect();

    // Parse each value as a float and collect into a Vec<u64>
    let result: Option<Vec<u64>> = values
        .into_iter()
        .map(|v| v.trim().parse::<u64>().ok())
        .collect();

    result
}

impl FilterbankParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let band_frequencies = parse_int_vector(params.get("band_frequencies").ok_or(
            RequestParseError::MalformedRequest("Missing key: band_frequencies".to_string()),
        )?)
        .ok_or(RequestParseError::MalformedRequest(
            "Invalid value for key: band_frequencies (expected - Vec<f64>)".to_string(),
        ))?;

        let quality_factor = parse_float_vector(params.get("quality_factor").ok_or(
            RequestParseError::MalformedRequest("Missing key: quality_factor".to_string()),
        )?)
        .ok_or(RequestParseError::MalformedRequest(
            "Invalid value for key: quality_factor (expected - Vec<f64>)".to_string(),
        ))?;

        let attack_rates = parse_float_vector(params.get("attack_rates").ok_or(
            RequestParseError::MalformedRequest("Missing key: attack_rates".to_string()),
        )?)
        .ok_or(RequestParseError::MalformedRequest(
            "Invalid value for key: attack_rates (expected - Vec<f64>)".to_string(),
        ))?;

        let decay_rates = parse_float_vector(params.get("decay_rates").ok_or(
            RequestParseError::MalformedRequest("Missing key: decay_rates".to_string()),
        )?)
        .ok_or(RequestParseError::MalformedRequest(
            "Invalid value for key: decay_rates (expected - Vec<f64>)".to_string(),
        ))?;

        Ok(FilterbankParams {
            band_frequencies: band_frequencies,
            quality_factor: quality_factor,
            attack_rates: attack_rates,
            decay_rates: decay_rates,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct GainOpampParams {
    pub gain_mode: GainOpampMode,
    //pub opamp_implementation: OpampType,  //not supported as it is not exposed
    pub feedback_cap_count: f64,
}

impl GainOpampParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let gain_mode = match params.get("gain_mode")
            .ok_or(RequestParseError::MalformedRequest("Missing key: gain_mode".to_string()))?
            .as_str() {
                "Noninverting1x" => GainOpampMode::Noninverting1x,
                "Noninverting11x" => GainOpampMode::Noninverting11x,
                "Inverting2x" => GainOpampMode::Inverting2x,
                "Inverting4x" => GainOpampMode::Inverting4x,
                "Inverting10x" => GainOpampMode::Inverting10x,
                "Inverting20x" => GainOpampMode::Inverting20x,
                _ => return Err(RequestParseError::MalformedRequest("Invalid value for key: gain_mode (expected - Noninverting1x, Noninverting11x, Inverting2x, Inverting4x, Inverting10x, Inverting20x)".to_string())),
            };
        let feedback_cap_count = params
            .get("feedback_cap_count")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: feedback_cap_count".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: feedback_cap_count (expected - float)".to_string(),
                )
            })?;

        Ok(GainOpampParams {
            gain_mode: gain_mode,
            feedback_cap_count: feedback_cap_count,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct LookupTableParams {
    pub expression: String,
}

impl LookupTableParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        // TODO: Validate expression
        let expression = params
            .get("expression")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: expression".to_string(),
            ))?
            .to_string();

        Ok(LookupTableParams {
            expression: expression,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct MultiplierParams {
    pub slope: f64,
}

impl MultiplierParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let slope = params
            .get("slope")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: slope".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: slope (expected - float)".to_string(),
                )
            })?;

        Ok(MultiplierParams { slope: slope })
    }
}

fn parse_activation_function_vector(input: &str) -> Option<Vec<ActivationFunction>> {
    // Remove leading and trailing whitespaces and square brackets
    let trimmed_input = input.trim_start_matches('[').trim_end_matches(']');

    // Split the input string by commas
    let values: Vec<&str> = trimmed_input.split(',').collect();

    // Parse each value as a float and collect into a Vec<ActivationFunction>
    let result: Option<Vec<ActivationFunction>> = values
        .into_iter()
        .map(|v| match v.trim() {
            "Tanh" => Some(ActivationFunction::Tanh),
            "Sigmoid" => Some(ActivationFunction::Sigmoid),
            "ReLU" => Some(ActivationFunction::ReLU),
            "Linear" => Some(ActivationFunction::Linear),
            _ => None,
        })
        .collect();

    result
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct NeuralNetParams {
    pub weights: Vec<f64>,
    pub biases: Vec<f64>,
    pub activation_function: Vec<ActivationFunction>,
    pub activation_scale: Option<f64>,
    pub input_compress_scale: Option<f64>,
    pub input_compression_type: Option<ActivationFunction>,
}

impl NeuralNetParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let weights = parse_float_vector(params.get("weights").ok_or(
            RequestParseError::MalformedRequest("Missing key: weights".to_string()),
        )?)
        .ok_or(RequestParseError::MalformedRequest(
            "Invalid value for key: weights (expected - Vec<f64>)".to_string(),
        ))?;

        let biases = parse_float_vector(params.get("biases").ok_or(
            RequestParseError::MalformedRequest("Missing key: biases".to_string()),
        )?)
        .ok_or(RequestParseError::MalformedRequest(
            "Invalid value for key: biases (expected - Vec<f64>)".to_string(),
        ))?;

        let activation_function =
            parse_activation_function_vector(params.get("activation_function").ok_or(
                RequestParseError::MalformedRequest("Missing key: activation_function".to_string()),
            )?)
            .ok_or(RequestParseError::MalformedRequest(
                "Invalid value for key: activation_function (expected - Vec<ActivationFunction>)"
                    .to_string(),
            ))?;

        let activation_scale = match params.get("activation_scale") {
            Some(activation_scale) => Some(activation_scale.parse::<f64>().map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: activation_scale (expected - float)".to_string(),
                )
            })?),
            None => None,
        };
        let input_compress_scale = match params.get("input_compress_scale") {
            Some(input_compress_scale) => {
                Some(input_compress_scale.parse::<f64>().map_err(|_| {
                    RequestParseError::MalformedRequest(
                        "Invalid value for key: input_compress_scale (expected - float)"
                            .to_string(),
                    )
                })?)
            }
            None => None,
        };
        let input_compression_type = match params.get("input_compression_type") {
            Some(input_compression_type) => Some(
                match input_compression_type.as_str() {
                    "Tanh" => ActivationFunction::Tanh,
                    "Sigmoid" => ActivationFunction::Sigmoid,
                    "ReLU" => ActivationFunction::ReLU,
                    "Linear" => ActivationFunction::Linear,
                    _ => return Err(RequestParseError::MalformedRequest("Invalid value for key: input_compression_type (expected - Tanh, Sigmoid, ReLU, Linear)".to_string())),
                }
            ),
            None => None,
        };
        Ok(NeuralNetParams {
            weights: weights,
            biases: biases,
            activation_function: activation_function,
            activation_scale: activation_scale,
            input_compress_scale: input_compress_scale,
            input_compression_type: input_compression_type,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct PeakDetectorParams {
    pub atk: f64,
    pub dec: f64,
    pub model_version: ModelVersion,
    pub buff: Option<f64>,
    pub parasitic_ratio: Option<f64>,
}

impl PeakDetectorParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let atk = params
            .get("atk")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: atk".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: atk (expected - float)".to_string(),
                )
            })?;
        let dec = params
            .get("dec")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: dec".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: dec (expected - float)".to_string(),
                )
            })?;
        let model_version = match params
            .get("model_version")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: model_version".to_string(),
            ))?
            .as_str()
        {
            "FirstOrder" => ModelVersion::FirstOrder,
            "SecondOrder" => ModelVersion::SecondOrder,
            _ => {
                return Err(RequestParseError::MalformedRequest(
                    "Invalid value for key: model_version (expected - FirstOrder, SecondOrder)"
                        .to_string(),
                ))
            }
        };
        let buff = match params.get("buff") {
            Some(buff) => Some(buff.parse::<f64>().map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: buff (expected - float)".to_string(),
                )
            })?),
            None => None,
        };
        let parasitic_ratio = match params.get("parasitic_ratio") {
            Some(parasitic_ratio) => Some(parasitic_ratio.parse::<f64>().map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: parasitic_ratio (expected - float)".to_string(),
                )
            })?),
            None => None,
        };
        Ok(PeakDetectorParams {
            atk: atk,
            dec: dec,
            model_version: model_version,
            buff: buff,
            parasitic_ratio: parasitic_ratio,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct PGAParams {
    pub Av1: f64,
    pub Av2: f64,
    pub den: Option<f64>,
}

impl PGAParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let Av1 = params
            .get("Av1")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: Av1".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: Av1 (expected - float)".to_string(),
                )
            })?;
        let Av2 = params
            .get("Av2")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: Av2".to_string(),
            ))?
            .parse::<f64>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: Av2 (expected - float)".to_string(),
                )
            })?;
        let den = match params.get("den") {
            Some(den) => Some(den.parse::<f64>().map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: den (expected - float)".to_string(),
                )
            })?),
            None => None,
        };
        Ok(PGAParams {
            Av1: Av1,
            Av2: Av2,
            den: den,
        })
    }
}

fn parse_vector_vector_floats(input: &str) -> Option<Vec<Vec<f64>>> {
    // Remove leading and trailing whitespaces and square brackets
    let trimmed_input = input.trim_start_matches('[').trim_end_matches(']');

    // Split the input string by commas
    let values: Vec<&str> = trimmed_input.split("],[").collect();

    // Parse each value as a float and collect into a Vec<Vec<f64>>
    let result: Option<Vec<Vec<f64>>> = values.into_iter().map(|v| parse_float_vector(v)).collect();

    result
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct SynthesizedFilterParams {
    pub coefficients: Vec<Vec<f64>>,
}

impl SynthesizedFilterParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let coefficients = parse_vector_vector_floats(params.get("coefficients").ok_or(
            RequestParseError::MalformedRequest("Missing key: coefficients".to_string()),
        )?)
        .ok_or(RequestParseError::MalformedRequest(
            "Invalid value for key: coefficients (e.g. `[[1.0,2.0],[3.0,4.0]]`)".to_string(),
        ))?;

        Ok(SynthesizedFilterParams {
            coefficients: coefficients,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct TerminalParams {
    pub hardware_pin: Option<String>,
    pub is_input: bool,
    pub is_output: bool,
    pub is_ac_coupled: Option<bool>,
    pub is_extern: Option<bool>,
}

impl TerminalParams {
    fn from_hashmap(params: &HashMap<String, String>) -> Result<Self, RequestParseError> {
        let hardware_pin = match params.get("hardware_pin") {
            Some(hardware_pin) => Some(hardware_pin.to_string()),
            None => None,
        };
        let is_input = params
            .get("is_input")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: is_input".to_string(),
            ))?
            .parse::<bool>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: is_input (expected - bool)".to_string(),
                )
            })?;
        let is_output = params
            .get("is_output")
            .ok_or(RequestParseError::MalformedRequest(
                "Missing key: is_output".to_string(),
            ))?
            .parse::<bool>()
            .map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: is_output (expected - bool)".to_string(),
                )
            })?;
        let is_ac_coupled = match params.get("is_ac_coupled") {
            Some(is_ac_coupled) => Some(is_ac_coupled.parse::<bool>().map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: is_ac_coupled (expected - bool)".to_string(),
                )
            })?),
            None => None,
        };
        let is_extern = match params.get("is_extern") {
            Some(is_extern) => Some(is_extern.parse::<bool>().map_err(|_| {
                RequestParseError::MalformedRequest(
                    "Invalid value for key: is_extern (expected - bool)".to_string(),
                )
            })?),
            None => None,
        };
        Ok(TerminalParams {
            hardware_pin: hardware_pin,
            is_input: is_input,
            is_output: is_output,
            is_ac_coupled: is_ac_coupled,
            is_extern: is_extern,
        })
    }
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
#[derive(PartialEq)]
pub enum CapacitorConfiguration {
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
#[derive(PartialEq)]
pub enum FilterType {
    lpf1,
    lpf2,
    bpf2,
    hpf1,
    hpf2,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
#[derive(PartialEq)]
pub enum GainOpampMode {
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
#[derive(PartialEq)]
pub enum OpampType {
    StageZero,
    Pin,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
#[derive(PartialEq)]
pub enum ModelVersion {
    FirstOrder,
    SecondOrder,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
#[derive(PartialEq)]
pub enum UpDownType {
    Rate,
    Hang,
}

//// NOTE: Not exported due to ElementVO
// #[derive(Debug, Serialize, Deserialize, TS)]
// #[ts(export)]
// #[ts(export_to = "../src/service/RemoteService/client/bindings/")]
#[derive(PartialEq, Debug)]
pub enum ActivationFunction {
    Tanh,
    Sigmoid,
    ReLU,
    Linear,
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
    use std::{env, fs::File, io::Read};

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

    #[test]
    fn test_AcDiffParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("gain".to_string(), "1.0".to_string());
        params.insert("bias".to_string(), "2.0".to_string());

        // act
        let result = AcDiffParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().gain, 1.0);
        assert_eq!(result.as_ref().unwrap().bias.unwrap(), 2.0);
    }

    #[test]
    fn test_AsymmetricIntegratorParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("up".to_string(), "1.0".to_string());
        params.insert("down".to_string(), "2.0".to_string());
        params.insert("up_down_type".to_string(), "Rate".to_string());
        params.insert("comparator_enable".to_string(), "true".to_string());

        // act
        let result = AsymmetricIntegratorParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().up, 1.0);
        assert_eq!(result.as_ref().unwrap().down, 2.0);
        assert!(result.as_ref().unwrap().up_down_type == UpDownType::Rate);
        assert_eq!(result.as_ref().unwrap().comparator_enable, true);
    }

    #[test]
    fn test_ComparatorParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("threshold".to_string(), "1.0".to_string());
        params.insert("hysteresis_voltage".to_string(), "2.0".to_string());

        // act
        let result = ComparatorParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().threshold, 1.0);
        assert_eq!(result.as_ref().unwrap().hysteresis_voltage.unwrap(), 2.0);
    }

    #[test]
    fn test_ComparatorParams_from_hashmap_withNone() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("threshold".to_string(), "1.0".to_string());

        // act
        let result = ComparatorParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().threshold, 1.0);
        assert_eq!(result.as_ref().unwrap().hysteresis_voltage, None);
    }

    #[test]
    fn test_FilterParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("characteristic_frequency".to_string(), "1.0".to_string());
        params.insert("quality_factor".to_string(), "2.0".to_string());
        params.insert("filter_type".to_string(), "lpf1".to_string());

        // act
        let result = FilterParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().characteristic_frequency, 1.0);
        assert_eq!(result.as_ref().unwrap().quality_factor, 2.0);
        assert!(result.as_ref().unwrap().filter_type == FilterType::lpf1);
    }

    #[test]
    fn test_FilterbankParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("band_frequencies".to_string(), "[1,2,3]".to_string());
        params.insert("quality_factor".to_string(), "[1.0,2.0,3.0]".to_string());
        params.insert("attack_rates".to_string(), "[1.0,2.0,3.0]".to_string());
        params.insert("decay_rates".to_string(), "[1.0,2.0,3.0]".to_string());

        // act
        let result = FilterbankParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().band_frequencies, vec![1, 2, 3]);
        assert_eq!(result.as_ref().unwrap().quality_factor, vec![1.0, 2.0, 3.0]);
        assert_eq!(result.as_ref().unwrap().attack_rates, vec![1.0, 2.0, 3.0]);
        assert_eq!(result.as_ref().unwrap().decay_rates, vec![1.0, 2.0, 3.0]);
    }

    #[test]
    fn test_GainOpampParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("gain_mode".to_string(), "Noninverting1x".to_string());
        params.insert("feedback_cap_count".to_string(), "2.0".to_string());

        // act
        let result = GainOpampParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert!(result.as_ref().unwrap().gain_mode == GainOpampMode::Noninverting1x);
        assert_eq!(result.as_ref().unwrap().feedback_cap_count, 2.0);
    }

    #[test]
    fn test_LookupTableParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("expression".to_string(), "1.0".to_string());

        // act
        let result = LookupTableParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().expression, "1.0".to_string());
    }

    #[test]
    fn test_MultiplierParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("slope".to_string(), "1.0".to_string());

        // act
        let result = MultiplierParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().slope, 1.0);
    }

    #[test]
    fn test_NeuralNetParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("weights".to_string(), "[1.0,2.0]".to_string());
        params.insert("biases".to_string(), "[1.0,2.0]".to_string());
        params.insert(
            "activation_function".to_string(),
            "[Tanh,Sigmoid]".to_string(),
        );
        params.insert("activation_scale".to_string(), "1.0".to_string());
        params.insert("input_compress_scale".to_string(), "1.0".to_string());
        params.insert("input_compression_type".to_string(), "Tanh".to_string());

        // act
        let result = NeuralNetParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().weights, vec![1.0, 2.0]);
        assert_eq!(result.as_ref().unwrap().biases, vec![1.0, 2.0]);
        assert_eq!(
            result.as_ref().unwrap().activation_function,
            vec![ActivationFunction::Tanh, ActivationFunction::Sigmoid]
        );
        assert_eq!(result.as_ref().unwrap().activation_scale, Some(1.0));
        assert_eq!(result.as_ref().unwrap().input_compress_scale, Some(1.0));
        assert_eq!(
            result.as_ref().unwrap().input_compression_type,
            Some(ActivationFunction::Tanh)
        );
    }

    #[test]
    fn test_PeakDetectorParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("atk".to_string(), "1.0".to_string());
        params.insert("dec".to_string(), "2.0".to_string());
        params.insert("model_version".to_string(), "FirstOrder".to_string());
        params.insert("buff".to_string(), "1.0".to_string());
        params.insert("parasitic_ratio".to_string(), "1.0".to_string());

        // act
        let result = PeakDetectorParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().atk, 1.0);
        assert_eq!(result.as_ref().unwrap().dec, 2.0);
        assert!(result.as_ref().unwrap().model_version == ModelVersion::FirstOrder);
        assert_eq!(result.as_ref().unwrap().buff, Some(1.0));
        assert_eq!(result.as_ref().unwrap().parasitic_ratio, Some(1.0));
    }

    #[test]
    fn test_PGAParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("Av1".to_string(), "1.0".to_string());
        params.insert("Av2".to_string(), "2.0".to_string());
        params.insert("den".to_string(), "1.0".to_string());

        // act
        let result = PGAParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(result.as_ref().unwrap().Av1, 1.0);
        assert_eq!(result.as_ref().unwrap().Av2, 2.0);
        assert_eq!(result.as_ref().unwrap().den, Some(1.0));
    }

    #[test]
    fn test_SynthesizedFilterParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert(
            "coefficients".to_string(),
            "[[1.0,2.0],[3.0,4.0]]".to_string(),
        );

        // act
        let result = SynthesizedFilterParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(
            result.as_ref().unwrap().coefficients,
            vec![vec![1.0, 2.0], vec![3.0, 4.0]]
        );
    }

    #[test]
    fn test_TerminalParams_from_hashmap() {
        // arrange
        let mut params: HashMap<String, String> = HashMap::new();
        params.insert("hardware_pin".to_string(), "1.0".to_string());
        params.insert("is_input".to_string(), "true".to_string());
        params.insert("is_output".to_string(), "true".to_string());
        params.insert("is_ac_coupled".to_string(), "true".to_string());
        params.insert("is_extern".to_string(), "true".to_string());

        // act
        let result = TerminalParams::from_hashmap(&params);

        // assert
        assert_eq!(result.as_ref().is_ok(), true);
        assert_eq!(
            result.as_ref().unwrap().hardware_pin,
            Some("1.0".to_string())
        );
        assert_eq!(result.as_ref().unwrap().is_input, true);
        assert_eq!(result.as_ref().unwrap().is_output, true);
        assert_eq!(result.as_ref().unwrap().is_ac_coupled, Some(true));
        assert_eq!(result.as_ref().unwrap().is_extern, Some(true));
    }

    #[test]
    fn test_to_network() {
        // arrange
        let mut file_path = std::path::PathBuf::new();
        file_path.push("src");
        file_path.push("aml_core");
        file_path.push("sample_request.json");

        let nvo: NetworkVO = NetworkVO::from_json(file_path).unwrap();

        // act
        let result = nvo.to_network();

        // assert
        assert_eq!(result.is_ok(), true);
    }
}
