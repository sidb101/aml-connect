-- Your SQL goes here
CREATE TABLE projects (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    description TEXT
)