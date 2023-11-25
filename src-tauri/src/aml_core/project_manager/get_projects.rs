use diesel::{result::Error::NotFound, ExpressionMethods, QueryDsl, RunQueryDsl};

use crate::aml_core::{
    db_adapter::{models::Project, schema::projects, DbConn},
    AppError,
};

use super::{
    GetProjectsResponse, GetProjectsResponseResult, ProjectDetails,
    ProjectManagerError,
};

pub fn get_projects(conn: &mut DbConn) -> GetProjectsResponseResult {
    let projects = projects::table
        .load::<Project>(conn)
        .map_err(|e| ProjectManagerError::InternalError(e.to_string()));

    let project_details = match projects {
        Ok(projects) => {
            let project_details: Vec<ProjectDetails> = projects
                .into_iter()
                .map(|p| transform_project_for_response(p.clone()))
                .collect();
            project_details
        }
        Err(e) => {
            log::error!("Error getting projects: {}", e);
            return Err(AppError::ProjectManagerError(e)).into();
        }
    };

    Ok(GetProjectsResponse {
        projects: project_details,
    })
}

fn transform_project_for_response(db_project: Project) -> ProjectDetails {
    ProjectDetails {
        id: db_project.id,
        slug: db_project.slug,
        name: db_project.name,
        description: db_project.description,
        created_at: db_project.created_at,
        modified_at: db_project.modified_at,
    }
}

pub fn get_project(proj_id: i32, conn: &mut DbConn) -> Result<Project, ProjectManagerError> {
    if !project_exists(proj_id, conn)? {
        log::error!("Project not found");
        return Err(ProjectManagerError::ProjectNotFound(proj_id.to_string()));
    }
    let found_project = projects::table
        .find(proj_id)
        .first::<Project>(conn)
        .map_err(|e| ProjectManagerError::InternalError(e.to_string()))?;
    Ok(found_project)
}

pub fn project_exists(proj_id: i32, db_conn: &mut DbConn) -> Result<bool, ProjectManagerError> {
    let found_project = projects::table.find(proj_id).first::<Project>(db_conn);

    match found_project {
        Ok(_) => Ok(true),
        Err(NotFound) => Ok(false),
        Err(e) => {
            eprintln!("Error finding project - {}", proj_id);
            Err(ProjectManagerError::InternalError(e.to_string()))
            // Err(anyhow::anyhow!("Error finding project - {}", proj_id))
        }
    }
}

// TODO: This should be removed once the front end API switches to using ID instead of slug
pub fn get_project_by_slug(
    proj_slug: &str,
    conn: &mut DbConn,
) -> Result<Project, ProjectManagerError> {
    if !project_exists_by_slug(proj_slug, conn)? {
        log::error!("Project not found");
        return Err(ProjectManagerError::ProjectNotFound(proj_slug.to_string()));
    }
    let found_project = projects::table
        .filter(projects::slug.eq(proj_slug))
        .first::<Project>(conn)
        .map_err(|e| ProjectManagerError::InternalError(e.to_string()))?;
    Ok(found_project)
}

pub fn project_exists_by_slug(
    proj_slug: &str,
    db_conn: &mut DbConn,
) -> Result<bool, ProjectManagerError> {
    let found_project = projects::table
        .filter(projects::slug.eq(proj_slug))
        .first::<Project>(db_conn);

    match found_project {
        Ok(_) => Ok(true),
        Err(NotFound) => Ok(false),
        Err(e) => {
            eprintln!("Error finding project - {}", proj_slug);
            Err(ProjectManagerError::InternalError(e.to_string()))
        }
    }
}
