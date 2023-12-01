use diesel::{QueryDsl, RunQueryDsl};

use crate::aml_core::{
    db_adapter::{models::Project, schema::projects, DbConn},
    file_data_manager,
    project_manager::{DeleteProjectResponse, ProjectManagerError},
    AppError,
};

use super::{DeleteProjectRequest, DeleteProjectResponseResult};

pub fn delete_project(
    req: &DeleteProjectRequest,
    app_dir: &std::path::PathBuf,
    conn: &mut DbConn,
) -> DeleteProjectResponseResult {
    log::info!("delete_project request received");

    let get_project_result = projects::table.find(req.id).first::<Project>(conn);

    let project = match get_project_result {
        Ok(project) => project,
        Err(diesel::result::Error::NotFound) => {
            log::warn!("project not found");
            return Err(AppError::ProjectManagerError(
                ProjectManagerError::ProjectNotFound("Project not found".to_string()),
            ));
        }
        Err(_) => {
            return Err(AppError::ProjectManagerError(
                ProjectManagerError::InternalError("Error getting project".to_string()),
            ))
        }
    };

    match diesel::delete(&project).execute(conn) {
        Ok(_) => {
            log::info!("project deleted");

            match file_data_manager::delete_project_dir(&project.slug, app_dir) {
                Ok(_) => log::info!("project directory deleted for {}", &project.slug),
                Err(e) => {
                    log::error!("error deleting project files: {}", e);
                    return Err(AppError::ProjectManagerError(
                        ProjectManagerError::InternalError(e.to_string()),
                    ));
                }
            }
            Ok(DeleteProjectResponse {})
        }
        Err(error) => {
            log::error!("error deleting project: {}", error);
            if error == diesel::result::Error::NotFound {
                return Err(AppError::ProjectManagerError(
                    ProjectManagerError::ProjectNotFound(error.to_string()),
                ));
            }
            Err(AppError::ProjectManagerError(
                ProjectManagerError::InternalError(error.to_string()),
            ))
        }
    }
}
