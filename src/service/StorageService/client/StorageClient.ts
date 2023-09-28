/* eslint-disable @typescript-eslint/consistent-type-definitions */

/**
 * This module would serve as interface with the FileSystem. This can be any kind of storage reserved for app,
 * like Local File System, S3 buckets, etc.
 * The fs clients need to implement this interface, for the app to work correctly.
 * Right now, TauriFS is implementing this interface.
 */
import type { InputFileDataT, InputFileMetaDataT } from "../../../redux/slices/DataHubSlice";

export interface StorageClient {
	/**
	 * Used for writing given file to the given path in storage
	 * @param fileData : Object having name and data-url of the file
	 * @param path: Path related to the storage, where files need to be saved.
	 */
	writeInputFileToStorage(fileData: InputFileDataT, path: string): Promise<InputFileDataT>;

	/**
	 * Used for reading given file present in given path in storage.
	 * @param fileMetaData: Metadata of the file to be read
	 * @param path: Appropriate Path of directory where file is present.
	 */
	readInputFileFromStorage(fileMetaData: InputFileMetaDataT, path: string): Promise<InputFileDataT>;
}
