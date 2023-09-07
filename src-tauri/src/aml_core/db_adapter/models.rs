use diesel::prelude::*;

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::aml_core::db_adapter::schema::projects)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Project {
    pub id: i32,
}