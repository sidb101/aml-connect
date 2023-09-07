use std::env;

use aml_connect::{self, aml_core::db_adapter};
use diesel::Connection;

#[test]
fn save_on_db() {
    env::set_var("DATABASE_PATH", "./tests");
    let conn_pool = db_adapter::establish_connection().unwrap();
    env::remove_var("DATABASE_PATH");
    let mut conn = conn_pool.get().unwrap();
    conn.begin_test_transaction().unwrap();
}