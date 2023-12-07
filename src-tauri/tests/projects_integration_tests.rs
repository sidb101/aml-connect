use std::fs;

use std::env;
use std::path::PathBuf;

use aml_connect::aml_core::db_adapter::models::NewProject;
use aml_connect::aml_core::db_adapter::schema::projects;
use aml_connect::aml_core::project_manager::create_project;
use aml_connect::aml_core::project_manager::delete_project;
use aml_connect::aml_core::project_manager::get_projects::get_project;
use aml_connect::aml_core::project_manager::update_project;
use aml_connect::aml_core::project_manager::ProjectManagerError;
use aml_connect::aml_core::{db_adapter, project_manager};
use anyhow::Context;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::{delete, Connection, ExpressionMethods, QueryDsl, RunQueryDsl, SqliteConnection};
use directories::BaseDirs;
use log::{info, warn};

#[test]
fn test_get_all_projects() {
    env::set_var("DATABASE_PATH", "./tests");
    let conn_pool = db_adapter::establish_connection(&PathBuf::new()).unwrap();
    env::remove_var("DATABASE_PATH");
    let mut conn = conn_pool.get().unwrap();
    conn.begin_test_transaction().unwrap();

    // Create some test projects
    add_dummy_projects(&conn_pool);

    let res = project_manager::get_projects::get_projects(&mut conn).unwrap();

    // Check that the returned projects match the inserted projects
    assert_eq!(res.projects.len(), 5);
    assert_eq!(
        res.projects[0].name,
        "Test Project for projects_integration_tests"
    );

    delete(projects::table).execute(&mut conn).unwrap();
}

#[test]
fn test_crud_project() {
    env::set_var("DATABASE_PATH", "./tests");
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    let mut conn = conn_pool.get().unwrap();
    conn.begin_test_transaction().unwrap();

    let app_dir = create_app_dir_if_not_exists().unwrap();

    let create_response = create_project::create_project(
        &project_manager::CreateProjectRequest {
            name: "TestProject".to_owned(),
            description: Some("Sample Description".to_owned()),
        },
        &app_dir,
        &mut conn,
    );

    assert!(create_response.is_ok());
    let project = create_response.unwrap().project;
    assert!(project.name == "TestProject");

    // assert!(fs::try_exists(app_dir.join(project.slug)).unwrap() == true);
    assert!(app_dir.join(&project.slug).exists() == true);

    let update_response = update_project::update_project(
        &project_manager::UpdateProjectRequest {
            id: project.id,
            name: Some("TestProject-Updated".to_owned()),
            description: Some("Updated Description".to_owned()),
        },
        &app_dir,
        &mut conn,
    );

    assert!(update_response.is_ok());
    let updated_project = update_response.unwrap().project;

    assert!(updated_project.name == "TestProject-Updated");
    assert!(updated_project.description == Some("Updated Description".to_owned()));

    //assert!(updated_project.slug == project.slug);
    assert!(app_dir.join(&updated_project.slug).exists() == true);
    assert!(app_dir.join(&project.slug).exists() == false);

    let delete_resp = delete_project::delete_project(
        &project_manager::DeleteProjectRequest { id: project.id },
        &app_dir,
        &mut conn,
    );

    assert!(delete_resp.is_ok());
    assert!(app_dir.join(&updated_project.slug).exists() == false);

    let find_proj_result = get_project(project.id, &mut conn);
    assert!(find_proj_result.is_err());
    assert!(matches!(
        find_proj_result,
        Err(ProjectManagerError::ProjectNotFound(_))
    ));

    fs::remove_dir_all(app_dir).unwrap();
}

fn create_app_dir_if_not_exists() -> anyhow::Result<PathBuf> {
    let app_dir = PathBuf::from(BaseDirs::new().unwrap().data_local_dir()).join("aml_connect");
    if !app_dir.exists() {
        fs::create_dir_all(app_dir.clone())?;
    }
    Ok(app_dir)
}

fn add_dummy_projects(db_conn_pool: &Pool<ConnectionManager<SqliteConnection>>) {
    add_dummy_project("test_project", db_conn_pool).unwrap_or_else(|e| {
        warn!(
            "Failed to add dummy project OR project already exists:{:?}",
            e
        );
        ()
    });

    add_dummy_project("test_project1", db_conn_pool).unwrap_or_else(|e| {
        warn!(
            "Failed to add dummy project OR project already exists:{:?}",
            e
        );
        ()
    });
    add_dummy_project("test_project2", db_conn_pool).unwrap_or_else(|e| {
        warn!(
            "Failed to add dummy project OR project already exists:{:?}",
            e
        );
        ()
    });
    add_dummy_project("test_project3", db_conn_pool).unwrap_or_else(|e| {
        warn!(
            "Failed to add dummy project OR project already exists:{:?}",
            e
        );
        ()
    });
    add_dummy_project("test_project4", db_conn_pool).unwrap_or_else(|e| {
        warn!(
            "Failed to add dummy project OR project already exists:{:?}",
            e
        );
        ()
    });
}

fn add_dummy_project(
    project_slug: &str,
    db_conn_pool: &Pool<ConnectionManager<SqliteConnection>>,
) -> anyhow::Result<()> {
    let conn = &mut db_conn_pool
        .get()
        .with_context(|| "failed to get db connection to add dummy project")?;

    let match_count = projects::table
        .filter(projects::slug.eq(project_slug))
        .count()
        .get_result::<i64>(conn)
        .with_context(|| format!("failed to get count of projects with slug : {project_slug}"))?;

    if match_count == 1 {
        info!("Dummy project already exists");
        Ok(())
    } else {
        info!("Adding dummy project");
        let dummy_project = NewProject {
            slug: project_slug.to_owned(),
            name: "Test Project for projects_integration_tests".to_owned(),
            description: Some("This is a test project".to_owned()),
        };
        diesel::insert_into(projects::table)
            .values(&dummy_project)
            .execute(conn)
            .with_context(|| format!("failed to insert dummy project : {project_slug}"))?;
        Ok(())
    }
}
