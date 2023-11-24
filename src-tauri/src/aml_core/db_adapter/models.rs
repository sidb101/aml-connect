use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::aml_core::date_time::AMLDateTime;

// use crate::aml_core::date_time::DateTime;

#[derive(Queryable, Selectable, Debug, Serialize, Deserialize, Clone)]
#[diesel(table_name = crate::aml_core::db_adapter::schema::projects)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Project {
    pub id: i32,
    pub slug: String,
    pub name: String,
    pub description: Option<String>,
    pub modified_at: AMLDateTime,
    pub created_at: AMLDateTime,
}

#[derive(Insertable)]
#[diesel(table_name = crate::aml_core::db_adapter::schema::projects)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewProject {
    pub slug: String,
    pub name: String,
    pub description: Option<String>,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::aml_core::db_adapter::schema::input_data)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct InputData {
    pub id: i32,
    pub file_name: String,
    pub ml_dataset_type: Option<String>,
    pub file_type: Option<String>,
    pub file_extension: Option<String>,
    pub file_size: Option<i32>,
    pub file_path: Option<String>,
    pub uploaded_data: Option<chrono::NaiveDateTime>,
    pub project_id: i32,
}

#[derive(Insertable)]
#[diesel(table_name = crate::aml_core::db_adapter::schema::input_data)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewInputData<'a> {
    pub file_name: Option<&'a str>,
    pub ml_dataset_type: Option<&'a str>,
    pub file_type: Option<&'a str>,
    pub file_extension: Option<&'a str>,
    pub file_size: Option<i32>,
    pub file_path: Option<&'a str>,
    pub uploaded_data: Option<&'a chrono::NaiveDateTime>,
    pub project_id: i32,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::aml_core::db_adapter::schema::audio_files)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct AudioFile {
    pub id: i32,
    pub length: Option<i32>,
    pub category: Option<String>,
    pub peak_frequency: Option<i32>,
    pub spi_level: Option<i32>,
    pub input_data_id: i32,
}

#[derive(Insertable)]
#[diesel(table_name = crate::aml_core::db_adapter::schema::audio_files)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct NewAudioFile<'a> {
    pub length: Option<i32>,
    pub category: Option<&'a str>,
    pub peak_frequency: Option<i32>,
    pub spi_level: Option<i32>,
    pub input_data_id: i32,
}
