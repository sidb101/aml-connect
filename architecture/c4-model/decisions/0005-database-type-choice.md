# 5. Database type choice

Date: 2023-07-10

## Status

Proposed

## Context

We need to chose a database technology to store data on the backend. The important data entities are *networks* and *projects*.
Considering our portability quality attribute is essential when selecting our database. The database choice will have important consequences when the application is ported to the cloud.
The [entity relationship diagram](https://drive.google.com/file/d/1HpGS0lqEjjEjxwa3O38WLmJWvm6fb3PE/view?usp=sharing) served as motivation when making the choice.

## Decision

We will use a **Document database** to save data on the backend.

## Rationale

The reasons for making this decision are as follows:

- Most relationships among our entities are one-to-many relationships.
- We will always write the entire *Network* object to the database since changes to *Network* are stored at the front end till they need to be sent to the server(on save or simulate). Since we do NOT need to update specific fields inside *Network* frequently, there is no write overhead when overwriting files.
- Database reads for *Project* and *Network* will fetch the entire representation instead of the objects since they will be sent to the user interface when the corresponding project is opened by the user. This will optimize the latency of our reads in a document model vs a SQL model since there will be no need to perform multiple disk seeks to fetch the objects.
- There is a wide vareity of *Element* types in a *Network*. It is unfeasible to have a separate table for each type of *Element*, which would be required in a SQL database. New types of *Element* are expected to be added to the application in the future. A fixed schema (schema-onw-write) will make it challenging to add new types of *Element*.
- JSON representations in the Document DB will remove impedence mismatch between the application server and the front end since the Redux store will store JSON representations on the front end.

## Consequences

This choice has major consequences in the development, deplyoment and maintenance of the application.
Since we are using a document model, we need to be careful of adding many-to-many relationships in our data. Network elements need to be handled in code instead of by the database.
Document DB enables us to add new Element Types without changing the schema of the database.
