/**
 * This module would serve as interface with the Backend system. This can be any kind of server that performs processing
 * for app, like Web Server (HTTP), Rust Server (IPC), etc.
 * The api clients need to implement this interface, for the app to work correctly.
 * Right now, TauriAPI is implementing this interface.
 */
import type { FilesUploadRequest } from "./bindings/FilesUploadRequest";
import type { FilesUploadResponse } from "./bindings/FilesUploadResponse";

export type ApiInterface = {
	/**
	 * This method would upload the files metadata to the backend, to perform validations
	 * and persistence.
	 * @param filesUploadRequest: Request containing the required data to upload the files
	 */
	uploadFiles(filesUploadRequest: FilesUploadRequest): Promise<FilesUploadResponse>;
};
