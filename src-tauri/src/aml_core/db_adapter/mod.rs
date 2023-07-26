use anyhow::{Context, Error, Result};
use diesel::migration::MigrationConnection;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::{Connection, SqliteConnection};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use directories::ProjectDirs;
use dotenvy::dotenv;
use log::info;
use std::env;
use std::fs;

pub mod models;
pub mod schema;

pub type SqlitePool = Pool<ConnectionManager<SqliteConnection>>;
const DB_NAME: &'static str = "aml_connect.db";
pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

pub fn establish_connection() -> Result<SqlitePool> {
    let db_url = get_url()?;

    let mut db_connection = create_if_not_exists(&db_url)?;
    initialize_diesel_schema(&mut db_connection)?;

    let conn_pool = new_conn_pool(db_url)?;
    Ok(conn_pool)
}

pub fn run_db_migrations(conn_pool: &Pool<ConnectionManager<SqliteConnection>>) -> Result<()> {
    conn_pool
        .get()
        .with_context(|| "Failed to get DB connection to run migrations")?
        .run_pending_migrations(MIGRATIONS)
        .map_err(|e| Error::msg(format!("Failed to run migrations: {:?}", e)))?;

    Ok(())
}

fn new_conn_pool(db_url: String) -> Result<Pool<ConnectionManager<SqliteConnection>>> {
    let connection_manager = ConnectionManager::<SqliteConnection>::new(db_url);

    //Creates 3 threads in the pool by default
    Pool::builder()
        .build(connection_manager)
        .with_context(|| "Failed to open minimum number of database connections\n")
}

fn get_url() -> Result<String> {
    
    dotenv().ok();

    let db_path = match env::var("DATABASE_PATH") {
        Ok(env_path) => {
            info!("Using environment variable for database");
            env_path
        }
        Err(_) => {
            info!("Using OS specific application directory for database");
            let proj_dirs = ProjectDirs::from("com", "aspinity", "aml_connect")
                .with_context(|| "Failed to get application directory\n")?;

            let app_dir = proj_dirs.data_local_dir();

            fs::create_dir_all(app_dir)
                .with_context(|| "Failed to create application directory\n")?;

            app_dir
                .to_str()
                .with_context(|| "Failed to convert application directory to string\n")?
                .to_owned()
        }
    };

    let db_url = db_path + "/" + DB_NAME;
    info!("Using database at {}", db_url);
    Ok(db_url)
}

fn create_if_not_exists(db_url: &str) -> Result<SqliteConnection> {
    match SqliteConnection::establish(&db_url) {
        Ok(connection) => Ok(connection),
        Err(e) => Err(Error::msg(format!(
            "Failed to establish connection to database: {:?}",
            e
        ))),
    }
}

fn initialize_diesel_schema(db_connection: &mut SqliteConnection) -> Result<()> {
    let _ = db_connection
        .setup()
        .with_context(|| "Failed to diesel schema migrations table\n")?;
    Ok(())
}

#[cfg(test)]
mod tests{
    use super::*;

    #[test]
    fn test_get_url_from_env() {
        let db_path = "/home/test_user/.local/share/aml_connect";
        env::set_var("DATABASE_PATH", db_path);
        let db_url = get_url().unwrap();
        env::remove_var("DATABASE_PATH");

        assert_eq!(db_url, "/home/test_user/.local/share/aml_connect/aml_connect.db");
    }
}
