use serde::{Deserialize, Serialize};
use thiserror::Error;
use ts_rs::TS;

use super::{date_time::AMLDateTime, AppError};

pub mod get_projects;
pub mod create_project;
pub mod update_project;

#[derive(Debug, Serialize, Deserialize,TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct ProjectDetails {
    pub id: i32,
    pub slug: String,
    pub name: String,
    pub description: Option<String>,
    pub modified_at: AMLDateTime,
    pub created_at: AMLDateTime,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct CreateProjectRequest {
    pub name: String,
    pub description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct CreateProjectResponse {
    pub project: ProjectDetails,
}

pub type CreateProjectResponseResult = Result<CreateProjectResponse, AppError>;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct UpdateProjectRequest {
    pub id: i32,
    pub name: Option<String>,
    pub description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct UpdateProjectResponse {
    pub project: ProjectDetails,
}

pub type UpdateProjectResponseResult = Result<UpdateProjectResponse, AppError>;



#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct GetProjectResponse {
    pub project: ProjectDetails,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct GetProjectsRequest {}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub struct GetProjectsResponse {
    pub projects: Vec<ProjectDetails>,
}

pub type GetProjectsResponseResult = Result<GetProjectsResponse, AppError>;

#[derive(Error, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum ProjectManagerError {
    #[error("project not found")]
    ProjectNotFound(String),
    #[error("project already exists")]
    ProjectExists(String),
    #[error("internal error")]
    InternalError(String),
    
}
