use std::env;

use aml_connect::aml_core::db_adapter::models::NewProject;
use aml_connect::aml_core::db_adapter::schema::projects;
use aml_connect::aml_core::{db_adapter, project_manager};
use anyhow::Context;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::{delete, Connection, ExpressionMethods, QueryDsl, RunQueryDsl, SqliteConnection};
use log::{info, warn};

#[test]
fn test_get_all_projects() {
    env::set_var("DATABASE_PATH", "./tests");
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    let mut conn = conn_pool.get().unwrap();
    conn.begin_test_transaction().unwrap();

    // Create some test projects
    add_dummy_projects(&conn_pool);

    let res = project_manager::get_projects::get_projects(
        &project_manager::GetProjectsRequest {},
        &mut conn,
    )
    .unwrap();

    // Check that the returned projects match the inserted projects
    assert_eq!(res.projects.len(), 5);
    assert_eq!(
        res.projects[0].name,
        "Test Project for projects_integration_tests"
    );

    delete(projects::table).execute(&mut conn).unwrap();
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
