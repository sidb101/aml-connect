use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods};

use crate::aml_core::{
    db_adapter::{models::Project, schema::{projects, audio_files, input_data}, DbConn},
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

    // Deleting audio files and input data mapped to this project from DB. disk will be deleted later.
    // Get input data records mapped to this project
    let input_data_records = match input_data::table
        .filter(input_data::project_id.eq(project.id))
        .load::<crate::aml_core::db_adapter::models::InputData>(conn)
    {
        Ok(input_data_records) => input_data_records,
        Err(error) => {
            log::error!("error getting input data records: {}", error);
            return Err(AppError::ProjectManagerError(
                ProjectManagerError::InternalError(error.to_string()),
            ));
        }
    };

    // Delete audio files mapped to each input data record
    for input_data_record in input_data_records {
        match diesel::delete(audio_files::table.filter(audio_files::input_data_id.eq(input_data_record.id)))
            .execute(conn)
        {
            Ok(_) => log::info!("audio files deleted"),
            Err(error) => {
                log::error!("error deleting audio files: {}", error);
                return Err(AppError::ProjectManagerError(
                    ProjectManagerError::InternalError(error.to_string()),
                ));
            }
        }
    }

    // Delete input data records
    match diesel::delete(input_data::table.filter(input_data::project_id.eq(project.id))).execute(conn) {
        Ok(_) => log::info!("input data records deleted"),
        Err(error) => {
            log::error!("error deleting input data records: {}", error);
            return Err(AppError::ProjectManagerError(
                ProjectManagerError::InternalError(error.to_string()),
            ));
        }
    }

    match diesel::delete(&project).execute(conn) {
        Ok(_) => {
            log::info!("project deleted");
            // TODO: delete audio file metadata if needed from DB
            match file_data_manager::delete_project_dir(&project.slug, app_dir) {
                Ok(_) => log::info!("project directory deleted for {}", &project.slug),
                Err(e) => {
                    log::error!("error deleting project files - disk might not be in sync with database: {}", e);
                    return Err(AppError::ProjectManagerError(
                        ProjectManagerError::InternalError(e.to_string()),
                    ));
                }
            }
            Ok(DeleteProjectResponse {})
        }
        Err(error) => {
            log::error!("error deleting project: {}", error);
            Err(AppError::ProjectManagerError(
                ProjectManagerError::InternalError(error.to_string()),
            ))
        }
    }
}
