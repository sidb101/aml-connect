use crate::aml_connect::aml_core::db_adapter::models::*;
use std::{env, path::{Path, PathBuf}};

use aml_connect::{
    self,
    aml_core::{db_adapter::{self, schema::projects}, file_data_manager::{FilesUploadRequest, FileUploadRequest, DataSet, self}},
};
use diesel::{
    query_dsl::methods::FilterDsl, Connection, ExpressionMethods, RunQueryDsl, SelectableHelper,
};
use directories::BaseDirs;
use log::info;

use aml_connect::aml_core::network_manager::{self, SimulatorError, NetworkSimulator};
use serde_json::{self, Value};

#[test]
fn save_on_db() {
    env::set_var("DATABASE_PATH", "./tests");
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    let mut conn = conn_pool.get().unwrap();
    conn.begin_test_transaction().unwrap();
}

#[test]
fn test_list_elements_from_simulator() {
    
    let mut sc = network_manager::AmlSimulatorSidecar::new();
    sc.sidecar_name = String::from("../aspinity_wrapper");
    let elements_json_str = network_manager::AmlSimulator::list_elements(&sc)
        .unwrap();
    let elements_json: Value = serde_json::from_str(elements_json_str.as_str())
        .map_err(|e| SimulatorError::JsonParseError(e.to_string()))
        .unwrap();

    // check that one of the keys "AcDiff" exist in elements_json
    assert!(elements_json["AcDiff"].is_object());
}
