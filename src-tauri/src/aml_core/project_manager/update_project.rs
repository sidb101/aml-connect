use std::path::PathBuf;

use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};

use crate::aml_core::{
    db_adapter::{models::NewProject, models::Project, schema::projects, DbConn},
    AppError, file_data_manager,
};

use super::{
    UpdateProjectRequest, UpdateProjectResponse, UpdateProjectResponseResult, 
    ProjectDetails, ProjectManagerError, 
    get_projects::{transform_project_for_response, get_project},
    create_project::generate_unique_slug,
};

pub fn update_project(
    req: &UpdateProjectRequest,
    app_dir: &PathBuf,
    conn: &mut DbConn
) -> UpdateProjectResponseResult {
    log::info!("update_project request received");

    // find project by ID
    let find_proj_result = get_project(req.id, conn);

    match find_proj_result {
        Err(e) => {
            Err(AppError::InternalError(e.to_string()))
        }
        Ok(project) => {
            match &req.name {
                Some(name) => {
                    let old_slug = project.slug;
                    let new_slug_result: Result<String, ProjectManagerError> = generate_unique_slug(&name, conn);
                    
                    match new_slug_result {
                        Err(error) => {
                            return Err(AppError::ProjectManagerError(ProjectManagerError::InternalError(
                                error.to_string(),
                            )));
                        }
                        Ok(new_slug) => {
                            let new_slug_owned = new_slug.clone();
                            //set ONLY if req.name || req.description is filled
                            let update_result = diesel::update(projects::table.filter(projects::id.eq(project.id)))
                            .set((
                                req.name.as_ref().map(|n| {
                                    (
                                        projects::name.eq(n),
                                        projects::slug.eq(new_slug),
                                    )
                                }),
                                req.description
                                    .as_ref()
                                    .map(|d| (projects::description.eq(d))),
                            ))
                            .returning((
                                projects::id,
                                projects::slug,
                                projects::name,
                                projects::description,
                                projects::modified_at,
                                projects::created_at,
                            ))
                            .get_result(conn);

                            let project: Project = match update_result {
                                Ok((id, slug, name, description, modified_at, created_at)) => Project {
                                    id,
                                    slug,
                                    name,
                                    description,
                                    modified_at,
                                    created_at,
                                },
                                Err(error) => {
                                    return Err(AppError::ProjectManagerError(ProjectManagerError::InternalError(
                                        error.to_string(),
                                    )));
                                }
                            };
                
                            let project_details: ProjectDetails = transform_project_for_response(project);
                            let _ =file_data_manager::update_project_dir(&old_slug, &new_slug_owned, app_dir)
                                .map_err(|error| {
                                    AppError::ProjectManagerError(ProjectManagerError::ProjectExists(error.to_string()))
                            });
                            log::info!("update_project response: {:?}", project_details);
                            return Ok(UpdateProjectResponse { project: project_details })
                        }
                    }
                }
                None => {
                    // name was not updated
                    let update_result = diesel::update(projects::table.filter(projects::id.eq(project.id)))
                        .set((
                            req.description
                                .as_ref()
                                .map(|d| (projects::description.eq(d))),
                        ))
                        .returning((
                            projects::id,
                            projects::slug,
                            projects::name,
                            projects::description,
                            projects::modified_at,
                            projects::created_at,
                        ))
                        .get_result(conn);
                    
                    let project: Project = match update_result {
                        Ok((id, slug, name, description, modified_at, created_at)) => Project {
                            id,
                            slug,
                            name,
                            description,
                            modified_at,
                            created_at,
                        },
                        Err(error) => {
                            return Err(AppError::ProjectManagerError(ProjectManagerError::InternalError(
                                error.to_string(),
                            )));
                        }
                    };
        
                    let project_details: ProjectDetails = transform_project_for_response(project);
                    log::info!("update_project response: {:?}", project_details);
                    return Ok(UpdateProjectResponse { project: project_details })
                }        
            }
        }
    }
}