// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Context;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SqliteConnection};
use log::{info, warn};
use simple_logger::SimpleLogger;
use std::path::PathBuf;

use aml_connect::aml_core::{db_adapter, project_manager};
use aml_connect::aml_core::db_adapter::models::NewProject;
use aml_connect::aml_core::db_adapter::schema::projects;
use aml_connect::aml_core::file_data_manager;
use aml_connect::uicontroller;


use aml_connect::aml_core::project_manager::create_project::create_project;
use aml_connect::aml_core::project_manager::update_project::update_project;

fn main() {
    info!("Starting AML Connect...");

    tauri::Builder::default()
        .setup(|app| {
            init_logger();
            info!("Initializing AML Connect...");
            let app_dir = init_fs(&app.path_resolver());
            let db_conn_pool = init_db(app_dir.clone());
            tauri::Manager::manage(app, db_conn_pool);
            tauri::Manager::manage(app, app_dir);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            uicontroller::get_elements,
            uicontroller::put_files,
            uicontroller::get_files,
            uicontroller::get_projects,
            uicontroller::create_project,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn init_db(app_dir: PathBuf) -> Pool<ConnectionManager<SqliteConnection>> {
    let db_conn_pool = db_adapter::establish_connection().unwrap_or_else(|e| {
        panic!("Could not establish connection to database :{:?}", e);
    });

    //Ensures that the migrations are run before the application starts
    db_adapter::run_db_migrations(&db_conn_pool).unwrap_or_else(|e| {
        warn!("Failed to run pending database migrations :{:?}", e);
        ()
    });

    // TODO: Remove this
    // add_dummy_projects(&db_conn_pool, &app_dir);

    // TODO: Remove this
    // Testing create_project
    let request = project_manager::CreateProjectRequest {
        name: "Henk Create Project".to_owned(),
        description: Some("A description that no one actually expected".to_owned()),
    };
    let conn_res = &mut db_conn_pool
        .get()
        .with_context(|| "failed to get db connection to add dummy project");

    match conn_res {
        Ok(conn) => {
            let response = create_project(&request, &app_dir, conn);
            info!("CreateProjectResponse: {:?}", response);

            match(response){
                Ok(success) => {
                    // Testing update_project (with name)
                    let update_request: project_manager::UpdateProjectRequest = project_manager::UpdateProjectRequest {
                        id: success.project.id,
                        name: Some("Henk Update Project".to_owned()),
                        description: None
                    };

                    let update_response = update_project(&update_request, &app_dir, conn);
                    info!("UpdateProjectResponse: {:?}", update_response);

                    // Updating project with just description
                    let update_request: project_manager::UpdateProjectRequest = project_manager::UpdateProjectRequest {
                        id: success.project.id,
                        name: None,
                        description: Some("I have changed the description".to_owned())
                    };

                    let update_response = update_project(&update_request, &app_dir, conn);
                    info!("UpdateProjectResponse: {:?}", update_response);
                }
                Err(_) => todo!(),
            }
            
        }
        Err(_) => todo!(),
    }

    
    

    db_conn_pool
}

// // TODO: Remove this when create projects is implemented
// fn add_dummy_projects(db_conn_pool: &Pool<ConnectionManager<SqliteConnection>>, app_dir: &PathBuf) {
//     add_dummy_project("test_project", "Glass Break Detection", "We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.", db_conn_pool, app_dir).unwrap_or_else(|e| {
//         warn!(
//             "Failed to add dummy project OR project already exists:{:?}",
//             e
//         );
//         ()
//     });

//     add_dummy_project("test_project1", "Dog Bark Detection", "We are developing a smart device for home pet monitoring. This device would detect the sounds of dog barking to notify the owners or take necessary actions.", db_conn_pool, app_dir).unwrap_or_else(|e| {
//         warn!(
//             "Failed to add dummy project OR project already exists:{:?}",
//             e
//         );
//         ()
//     });
//     add_dummy_project("test_project2", "Alexa Workword Detection", "We are improving the sensitivity of Alexa's wakeword detection. By increasing its detection accuracy, we aim to make the user interaction with the device more smooth and efficient.", db_conn_pool, app_dir).unwrap_or_else(|e| {
//         warn!(
//             "Failed to add dummy project OR project already exists:{:?}",
//             e
//         );
//         ()
//     });
//     add_dummy_project("test_project3", "Vibration Detection", "We are developing a smart device that detects abnormal vibrations. The device can be used in various contexts such as industrial machinery monitoring or building stability assessment.", db_conn_pool, app_dir).unwrap_or_else(|e| {
//         warn!(
//             "Failed to add dummy project OR project already exists:{:?}",
//             e
//         );
//         ()
//     });
//     add_dummy_project("test_project4", "Irregular Heartbeat Detection", "We are creating a wearable device that helps to monitor heart rhythms. The device aims to detect irregular heartbeat patterns to provide early warnings of potential health issues.",  db_conn_pool, app_dir).unwrap_or_else(|e| {
//         warn!(
//             "Failed to add dummy project OR project already exists:{:?}",
//             e
//         );
//         ()
//     });
// }

// This method changes the state on the system. It adds projects to database and creates file system directories
// fn add_dummy_project(
//     project_slug: &str,
//     project_name: &str,
//     project_description: &str,
//     db_conn_pool: &Pool<ConnectionManager<SqliteConnection>>,
//     app_dir: &PathBuf,
// ) -> anyhow::Result<()> {
//     let conn = &mut db_conn_pool
//         .get()
//         .with_context(|| "failed to get db connection to add dummy project")?;

//     let match_count = projects::table
//         .filter(projects::slug.eq(project_slug))
//         .count()
//         .get_result::<i64>(conn)
//         .with_context(|| format!("failed to get count of projects with slug : {project_slug}"))?;

//     if match_count == 1 {
//         info!("Dummy project already exists");
//         Ok(())
//     } else {
//         info!("Adding dummy project");
//         let dummy_project = NewProject {
//             slug: project_slug.to_owned(),
//             name: project_name.to_owned(),
//             description: Some(project_description.to_owned()),
//         };
//         diesel::insert_into(projects::table)
//             .values(&dummy_project)
//             .execute(conn)
//             .with_context(|| format!("failed to insert dummy project : {project_slug}"))?;

//         file_data_manager::create_project_dir(project_slug, app_dir).unwrap_or_else(|e| {
//             panic!("Could not create project dir :{:?}", e);
//         });

//         Ok(())
//     }
// }

fn init_fs(path_resolver: &tauri::PathResolver) -> PathBuf {
    // TODO: Fix
    file_data_manager::create_app_dir_if_not_exists(path_resolver).unwrap_or_else(|e| {
        panic!("Could not create app dir :{:?}", e);
    })
}

fn init_logger() {
    SimpleLogger::new().init().unwrap_or_else(|e| {
        panic!("Failed to initialize logger :{:?}", e.to_string());
    });
}
