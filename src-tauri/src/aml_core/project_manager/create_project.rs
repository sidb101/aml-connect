use std::path::PathBuf;

use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};

use crate::aml_core::{
    db_adapter::{models::NewProject, models::Project, schema::projects, DbConn},
    AppError, file_data_manager,
};

use super::{
    CreateProjectRequest, CreateProjectResponse, CreateProjectResponseResult, ProjectDetails,
    ProjectManagerError, get_projects::{transform_project_for_response, project_exists_by_slug}, 
};

pub fn create_project(
    req: &CreateProjectRequest,
    app_dir: &PathBuf, //stored in the application state
    conn: &mut DbConn
) -> CreateProjectResponseResult {
    log::info!("create_project request received");

    let match_count = projects::table
        .filter(projects::name.eq(req.name.as_str()))
        .count()
        .get_result::<i64>(conn);
    
    match match_count {
        Ok(count) => {
            if count >= 1 {
                let error_message = format!("Project with name '{}' already exists", req.name);
                return Err(AppError::ProjectManagerError(ProjectManagerError::ProjectExists(error_message.into())));
            } else {
                log::info!("project doesnt exist, can create");
                let new_slug_result = generate_unique_slug(&req.name, conn);
                match new_slug_result {
                    Ok(new_slug) => {
                        let new_project: NewProject = NewProject {
                            slug: new_slug.to_owned(),
                            name: req.name.to_owned(),
                            description: req.description.as_ref().map(|desc| desc.clone()),
                        };
                        
                        let insertion_result = diesel::insert_into(projects::table)
                            .values(&new_project)
                            .returning((
                                projects::id,
                                projects::slug,
                                projects::name,
                                projects::description,
                                projects::modified_at,
                                projects::created_at,
                            ))
                            .get_result(conn);

                        let project: Project = match insertion_result {
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
                    
                        
                        let _ =file_data_manager::create_project_dir(&new_slug, app_dir)
                            .map_err(|error| {
                                AppError::ProjectManagerError(ProjectManagerError::ProjectExists(error.to_string()))
                            });
        
                            //panic!("Could not create project dir :{:?}", e); //TODO: return error instead of panic
                    
                        log::info!("create_project response: {:?}", project_details);
                        
                        return Ok(CreateProjectResponse{
                                    project: project_details
                                })
                    }
                    Err(error) => {
                        return Err(AppError::ProjectManagerError(error));
                    }
                }
            }
        }
        Err(e) => {
            Err(AppError::InternalError(e.to_string()))
        }
    }
}

//slug generation logic
//trim leading / trailing whitespace, convert to lowercase, and use hyphenate
//will add -<counter> to project_slug until its unique
pub fn generate_unique_slug(project_name: &str, conn: &mut DbConn) -> Result<String, ProjectManagerError> {
    let base_slug = project_name.trim().to_lowercase().replace(" ", "-");
    let mut new_slug = base_slug.clone();

    let mut counter = 1;
    while project_exists_by_slug(&new_slug, conn)? {
        new_slug = format!("{}-{}", base_slug, counter);
        counter += 1;
    }

    Ok(new_slug)
}