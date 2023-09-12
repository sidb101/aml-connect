use anyhow::{Context, Result};
use std::fmt;
use std::fs;
use std::path::PathBuf;
use thiserror::Error;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub enum DataSet {
    Testing,
    Validation,
    Training,
}

impl fmt::Display for DataSet {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            DataSet::Testing => write!(f, "testing"),
            DataSet::Validation => write!(f, "validation"),
            DataSet::Training => write!(f, "training"),
        }
    }
}

#[derive(Error, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub enum FileUploadError {
    #[error("file not found")]
    FileNotFound,
    #[error("processing error")]
    ProcessingError,
    #[error("file too large")]
    FileTooLarge,
    #[error("unsupported file extension")]
    UnsupportedFileExtension,
    #[error("database query error")]
    UnableToQueryDatabase(String),
    #[error("database update error")]
    UnableToStoreInDatabase(String),
    #[error("Unable to delete file from Filesystem")]
    UnableToDeleteFile(String),
    #[error("Unauthorized Access")]
    UnauthorizedAccess(String),
    // Add more error variants as needed.
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct FileUploadRequest {
    pub file_name: String, // relativePath to file from baseDir (e.g. \project1\training\glass-break.wav)
    pub dataset_type: DataSet,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct FilesUploadRequest {
    pub proj_slug: String,
    pub input_files: Vec<FileUploadRequest>,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct FileUploadErrorResponse {
    pub file_name: String,
    pub error_response: FileUploadError,
}

//this struct will also be used got QueryAudioFiles
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct FileMetadata {
    pub file_id: String,   // generated by db
    pub file_name: String, // relativePath to file from baseDir (e.g. \project1\training\glass-break.wav)
    pub dataset_type: DataSet,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct GetFilesRequest {
    pub proj_slug: String,
    pub dataset_type: DataSet,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct GetFilesResponse {
    pub files: Vec<FileMetadata>,
}

pub type GetFilesResponseResult = Result<GetFilesResponse, FileUploadError>;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/clients/api/bindings/")]
pub struct FilesUploadResponse {
    pub upload_success_files: Vec<FileMetadata>, //array of relative file paths of input files that were successfully stored in server side folder
    pub upload_failed_files: Vec<FileUploadErrorResponse>,
    pub attempted: i32,
    pub succeeded: i32,
    pub failed: i32,
}

pub type SaveFilesResponseResult = Result<FilesUploadResponse, FileUploadError>;

pub fn create_app_dir_if_not_exists(path_resolver: &tauri::PathResolver) -> Result<PathBuf> {
    // let proj_dirs = ProjectDirs::from("com", "aspinity", "aml_connect")
    //     .with_context(|| "Failed to get application directory\n")?;
    // let app_dir = proj_dirs.data_local_dir();

    let app_dir = path_resolver
        .app_local_data_dir()
        .with_context(|| "Failed to get application directory\n")?;

    if !app_dir.exists() {
        fs::create_dir_all(app_dir.clone()).with_context(|| "Failed to create application directory\n")?;
    }
    Ok(app_dir)
}