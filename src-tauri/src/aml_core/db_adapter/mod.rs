use anyhow::{Context, Error, Result};
use diesel::migration::MigrationConnection;
use diesel::r2d2::{ConnectionManager, Pool, PooledConnection};
use diesel::{Connection, SqliteConnection};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use dotenvy::dotenv;
use log::info;
use std::env;
use std::path::{Path, PathBuf};

pub mod models;
pub mod schema;

pub type SqlitePool = Pool<ConnectionManager<SqliteConnection>>;
pub type DbConn = PooledConnection<ConnectionManager<SqliteConnection>>;

pub const DB_NAME: &'static str = "aml_connect.db";
pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

pub fn establish_connection(app_dir: &PathBuf) -> Result<SqlitePool> {
    let db_url = get_url(app_dir)?;

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

fn get_url(app_dir: &PathBuf) -> Result<String> {
    dotenv().ok();

    let db_path = match env::var("DATABASE_PATH") {
        Ok(env_path) => {
            info!("Using environment variable for database");
            Path::new(&env_path).join(DB_NAME)
        }
        Err(_) => {
            info!("Using OS specific application directory for database");
            app_dir.join(DB_NAME)
        }
    };

    let db_url = db_path
        .to_str()
        .with_context(|| "Failed to convert database path to string\n")?
        .to_owned();
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
mod tests {
    use super::*;

    #[test]
    fn test_get_url_from_env() {
        let db_path = "/home/test_user/.local/share/aml_connect";
        env::set_var("DATABASE_PATH", db_path);
        let db_url = get_url(&PathBuf::new()).unwrap();
        env::remove_var("DATABASE_PATH");

        let expected_path = Path::new(db_path).join("aml_connect.db");
        assert_eq!(
            db_url,
            expected_path.to_str().unwrap()
        );
    }
}
