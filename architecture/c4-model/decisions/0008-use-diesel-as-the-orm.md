# 8. use diesel as the ORM

Date: 2023-07-31

## Status

Proposed

## Context

We are using Sqlite as our embedded database and want to ensure that we can easily port to the application to use a different SQL database(like postgres) that would be more appropriate when we move to the cloud.

## Decision

Use Diesel as an ORM and a query generator to interface with the SQLite database

## Consequences

1. We can use Diesel's query builder to write database queries more idiomatically.
2. We can easily switch to a different database (MySQL or Posgres) when the application is ported to the cloud.
3. Diesel does not support Sqlite's JSON subtype. (It does support it for MySQL and Postgres). This has the drawback that we would need to write the queries that deal with the Network object manually, or enhance Diesel's query generator to ensure that we can use JSON natively. If we do not enhance Diesel's offering, it will hurt porting the application to the cloud since those parts of the application would need to be re-written.
