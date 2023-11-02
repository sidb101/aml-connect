use std::error::Error;

use chrono::NaiveDateTime;
use diesel::sql_types::Timestamp;
use diesel::{prelude::Queryable, sqlite::Sqlite};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct AMLDateTime(pub NaiveDateTime);

impl TS for AMLDateTime {
    fn name() -> String {
        "Date".to_string()
    }

    fn dependencies() -> Vec<ts_rs::Dependency> {
        Vec::new()
    }

    fn transparent() -> bool {
        true
    }
}

impl Queryable<Timestamp, Sqlite> for AMLDateTime {
    type Row = NaiveDateTime;

    fn build(row: Self::Row) -> Result<Self, Box<dyn Error + Send + Sync>> {
        Ok(AMLDateTime(row))
    }
}

impl Clone for AMLDateTime {
    fn clone(&self) -> Self {
        AMLDateTime(self.0.clone())
    }
}
