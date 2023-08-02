/**
 * This module would serve as interface with the FileSystem. This can be any kind of storage reserved for app,
 * like Local File System, S3 buckets, etc.
 * The fs clients need to implement this interface, for the app to work correctly.
 * Right now, TauriFS is implementing this interface.
 */
import { type InputFileDataT } from "../../redux/slices/DataHubSlice";

export type FsInterface = {
	/**
	 * Used for writing given file to the given path. It uses tauri API to write the file.
	 * @param fileData : Object having name and data-url of the file
	 * @param path: Path related to the storage, where files need to be saved.
	 */
	writeFileToAppStorage(fileData: InputFileDataT, path: string): Promise<InputFileDataT>;
};
