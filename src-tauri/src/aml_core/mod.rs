use serde::{Deserialize, Serialize};
use thiserror::Error;
use ts_rs::TS;

pub mod date_time;
pub mod db_adapter;
pub mod element_repository;
pub mod file_data_manager;
pub mod network_manager;
pub mod project_manager;

#[derive(Error, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum AppError {
    #[error("internal error")]
    InternalError(String),
    #[error("project manager error")]
    ProjectManagerError(project_manager::ProjectManagerError),
    #[error("file upload error")]
    FileUploadError(file_data_manager::FileUploadError),
}
