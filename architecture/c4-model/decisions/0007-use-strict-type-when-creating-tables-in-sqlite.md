# 7. Use Strict type when creating tables in sqlite

Date: 2023-07-31

## Status

Proposed

## Context

We are using Sqlite as our primary database in the embedded application. Since portability is one of our main quality attributes we need to ensure that the database will be well supported when it is moved to the cloud.

## Decision

Use Strict type when creating SQL tables in Sqlite

## Consequences

Since we enforce the types of columns in Sqlite we prevent the use of Sqlite's flexible type system.
This is restrictive and requires additional effort at this stage but will ensure that the database can easily be ported to a different SQL database (like Postgres) that would be more appropriate when the application is ported to the cloud.
