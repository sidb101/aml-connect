-- Your SQL goes here
create table input_data (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    file_name TEXT UNIQUE,
    ml_dataset_type TEXT,
    file_type TEXT,
    file_extension TEXT,
    file_size INTEGER,
    file_path TEXT,
    uploaded_data DATETIME,
    project_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects (id)
)
