use super::*;
use crate::aml_core::db_adapter::schema::{input_data, projects};
use crate::aml_core::db_adapter::{models::InputData, DbConn};
use crate::aml_core::file_data_manager::FileUploadError;
use anyhow::Error;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use std::str::FromStr;

pub fn get_input_files(req: &GetFilesRequest, db_conn: &mut DbConn) -> GetFilesResponseResult {
    if req.proj_slug.is_empty() {
        log::error!("Project slug is empty");
        return Err(FileUploadError::ProjectNotFound("Project slug is empty".to_string()));
    }

    if !project_exists(&req.proj_slug, db_conn)? {
        log::error!("Project not found");
        return Err(FileUploadError::ProjectNotFound(req.proj_slug.clone()).into());
    }

    let uploaded_files = match &req.dataset_type {
        Some(dataset_type) => {
            let dataset_filter = dataset_type.to_string();
            input_data::table
                .inner_join(projects::table)
                .select((
                    input_data::id,
                    input_data::file_name,
                    input_data::ml_dataset_type,
                    input_data::file_type,
                    input_data::file_extension,
                    input_data::file_size,
                    input_data::file_path,
                    input_data::uploaded_data,
                    input_data::project_id,
                ))
                .filter(projects::slug.eq(&req.proj_slug))
                .filter(input_data::ml_dataset_type.eq(dataset_filter))
                .load::<InputData>(db_conn)
        }
        None => {
            log::info!("No dataset type specified, returning all files");
            input_data::table
                .inner_join(projects::table)
                .select((
                    input_data::id,
                    input_data::file_name,
                    input_data::ml_dataset_type,
                    input_data::file_type,
                    input_data::file_extension,
                    input_data::file_size,
                    input_data::file_path,
                    input_data::uploaded_data,
                    input_data::project_id,
                ))
                .filter(projects::slug.eq(&req.proj_slug))
                .load::<InputData>(db_conn)
        }
    }
    .map_err(|e| {
        log::error!("Error getting file metadata from database: {}", e);
        FileUploadError::UnableToQueryDatabase(e.to_string())
    })?;

    // TODO: Optimize this
    let mut files = Vec::with_capacity(uploaded_files.len());
    for file in uploaded_files {
        files.push(FileMetadata {
            file_id: file.id.to_string(),
            file_name: file.file_name,
            dataset_type: DataSet::from_str(&file.ml_dataset_type.unwrap()).unwrap(),
        })
    }

    Ok(GetFilesResponse { files })
}

#[cfg(test)]
mod tests {
    use diesel::r2d2::ConnectionManager;
    use crate::aml_core::{file_data_manager::GetFilesRequest, db_adapter::SqlitePool};
    use super::get_input_files;

    #[test]
    fn test_get_input_files_fails_for_empty_project_slug() {
       let req = GetFilesRequest {
           proj_slug: "".to_string(),
           dataset_type: None,
        };

        let mut db_conn = SqlitePool::new(ConnectionManager::new("")).unwrap().get().unwrap();
        assert!(get_input_files(&req, &mut db_conn).is_err()); 

    }
}