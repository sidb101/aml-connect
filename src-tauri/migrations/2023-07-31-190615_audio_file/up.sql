-- Your SQL goes here
create table audio_file (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    length INTEGER,
    type TEXT,
    peak_frequency INTEGER,
    spi_level INTEGER,
    input_data_id INTEGER,
    FOREIGN KEY (input_data_id) REFERENCES input_data (id)
)
