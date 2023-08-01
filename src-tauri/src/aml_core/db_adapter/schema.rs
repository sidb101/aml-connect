// @generated automatically by Diesel CLI.

diesel::table! {
    audio_files (id) {
        id -> Integer,
        length -> Nullable<Integer>,
        category -> Nullable<Text>,
        peak_frequency -> Nullable<Integer>,
        spi_level -> Nullable<Integer>,
        input_data_id -> Integer,
    }
}

diesel::table! {
    input_data (id) {
        id -> Integer,
        file_name -> Nullable<Text>,
        ml_dataset_type -> Nullable<Text>,
        file_type -> Nullable<Text>,
        file_extension -> Nullable<Text>,
        file_size -> Nullable<Integer>,
        file_path -> Nullable<Text>,
        uploaded_data -> Nullable<Timestamp>,
        project_id -> Integer,
    }
}

diesel::table! {
    projects (id) {
        id -> Integer,
        description -> Nullable<Text>,
    }
}

diesel::joinable!(audio_files -> input_data (input_data_id));
diesel::joinable!(input_data -> projects (project_id));

diesel::allow_tables_to_appear_in_same_query!(
    audio_files,
    input_data,
    projects,
);
