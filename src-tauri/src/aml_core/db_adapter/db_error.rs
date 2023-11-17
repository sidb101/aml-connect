#[derive(Error, Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[ts(export_to = "../src/service/RemoteService/client/bindings/")]
pub enum DBError {
    #[error("database query error")]
    UnableToQueryDatabase(String),
    #[error("database update error")]
    UnableToStoreInDatabase(String),
    #[error("Not Found")]
    NotFound(String),
    // Add more error variants as needed.
}

impl std::error::Error for DBError {}
