/**
 * This module would be used to communicate with the backend tauri application.
 * It will accept the data in required bindings and then give response back in terms of those bindings
 */
import type { RemoteClient } from "./RemoteClient";
import type { FilesUploadRequest } from "./bindings/FilesUploadRequest";
import { invoke } from "@tauri-apps/api/tauri";
import type { GetFilesRequest } from "./bindings/GetFilesRequest";
import type { FilesUploadResponse } from "./bindings/FilesUploadResponse";
import type { GetFilesResponse } from "./bindings/GetFilesResponse";

class TauriAPIClient implements RemoteClient {
	/**
	 * This method would send the files information to the backend
	 * @param filesUploadRequest: Request containing required information about files to be uploaded
	 */
	async uploadInputFiles(filesUploadRequest: FilesUploadRequest) {
		try {
			return (await invoke("put_files", { input: filesUploadRequest })) as FilesUploadResponse;
		} catch (e) {
			console.error("Couldn't upload the files to backend.", e);
			return Promise.reject("Error in uploading the files.");
		}
	}

	/**
	 * This method would get the files metadata from the tauri backend.
	 * @param getFilesRequest: Request having the project slug and data type
	 */
	async getInputFiles(getFilesRequest: GetFilesRequest) {
		try {
			return (await invoke("get_files", { input: getFilesRequest })) as GetFilesResponse;
		} catch (e) {
			console.error("Couldn't get the files from backend.", e);
			return Promise.reject("Error in getting the files.");
		}
	}
}

const remoteClient: RemoteClient = new TauriAPIClient();
export default remoteClient;
