# 6. Use Sqlite Database

Date: 2023-07-31

## Status

Proposed

Supercedes [5. Database type choice](0005-database-type-choice.md)

## Context

The initial decision to use a Document based database was motivated by the structure of the data.
Upon further analysis of the available embedded document DB's we realized that our options were limited.

Most embedded Document DB's(BonsaiDB, SurrealDB) with an API in Rust were still in their early stages(alpha/beta), or did not have active contributions.
The only viable option we were left with was UnqLite.

Though promising, experiments with UnqLite concluded that it was not a good fit. Even though the database itself had a friendly BSD license, the Jx9 engine (responsible for querying JSON from Unqlite) was licensed under a mixed GLP license. This license restricts the use of the engine in propreitary code since it requires that the source code of a project using it is made open source. [Link to license](https://jx9.symisc.net/licensing.html).

This limited our options and forced us to use Sqlite instead

## Decision

Use SqLite as the primary database for the application.

## Consequences

This choice has the following consequences:

1. Even though the data being stored makes more sense in a document DB, we need to modify and adjust the schema to fit a relational database.
2. Unlike other SQL databases like Postgres, Sqlite does not support JSON natively. They have minimal support for the JSON datatype as a wrapper over the standard TEXT datatype.
