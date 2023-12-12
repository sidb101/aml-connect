# 7. Use Sqlite as primary database

Date: 2023-12-07

## Status

Accepted

Supercedes [5. Database type choice](0005-database-type-choice.md)

## Context

There is no mature, stable document lightweight database with a Rust API at the time of writing this application. Since this is a standalone application, we need a database that is lightweight.

## Decision

Using Sqlite as the primary database for the application. According to previous ADR, networks can still be stored in their JSON representations in the database using [Json with SQLite](https://sqlite.org/json1.html)
Diesel is used as the ORM for the application.

## Consequences

Since we are using an ORM(Diesel), we can easily swap to a larger scale database like Postgres easily. Note that Diesel does not support JSON natively with Sqlite but does support it with MySQL and Postgres. We need to make this change carefully when we do it, so that the swap to a cloud based solution is easy.