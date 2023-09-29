-- Your SQL goes here
create table audio_files (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    length INTEGER,
    category TEXT,
    peak_frequency INTEGER,
    spi_level INTEGER,
    input_data_id INTEGER NOT NULL,
    FOREIGN KEY (input_data_id) REFERENCES input_data (id)
)