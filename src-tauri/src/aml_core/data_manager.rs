//when datamanager calls db manager (to store audio metadata in database)
//this crate would then be needed
//use crate::aml_core::network_manager::*;

use anyhow::{Context, Error, Result};
use directories::{ProjectDirs};
use std::path::{Path, PathBuf};
use std::fs;
use std::io::{self, Read, Write};

pub fn store_in_app_data(file_path: &str, base_dir: &str) -> Result<String> {
    let proj_dirs = ProjectDirs::from("com", "aspinity", "aml_connect")
        .with_context(|| "Failed to get application directory\n")?;

    let dest_folder = proj_dirs.data_local_dir();
    let file_path = Path::new(file_path);
    let base_dir = Path::new(base_dir);

    //let dest_folder = format!("{}\\",proj_dirs.data_local_dir().display());
    let abs_dest_file_path = copy_file(file_path, &dest_folder)
        .with_context(|| "Failed to copy file to destination\n")?;

    let rel_dest_file_path = get_relative_path(base_dir, abs_dest_file_path.as_ref())
        .with_context(|| "relative path calculation failed.")?;

    let rel_dest_file_path = rel_dest_file_path
                                        .to_str()
                                        .with_context(|| "Failed to convert application directory to string\n")?
                                        .to_owned();
    Ok(rel_dest_file_path)
}

fn get_relative_path(base_dir: &Path, absolute_path: &Path) -> Option<PathBuf> {
    // Ensure that both paths are absolute
    if !base_dir.is_absolute() || !absolute_path.is_absolute() {
        return None;
    }

    // Calculate the relative path
    let relative_path = absolute_path.strip_prefix(base_dir).ok()?;
    Some(relative_path.to_path_buf())
}

//retrieves file from source, and store in destination folder
//returns the absolute file path of the resulting file
fn copy_file(source_path: &Path, destination_folder: &Path) -> io::Result<PathBuf> {
    let file_name = source_path
        .file_name()
        .ok_or_else(|| io::Error::new(io::ErrorKind::InvalidInput, "Invalid source file path"))?
        .to_owned();

    let mut source_file = fs::File::open(source_path)?;
    let mut contents = Vec::new();
    source_file.read_to_end(&mut contents)?;

    let destination_path = destination_folder.join(&file_name);
    fs::create_dir_all(destination_folder)?;

    let mut destination_file = fs::File::create(&destination_path)?;
    destination_file.write_all(&contents)?;

    Ok(destination_path)
}
