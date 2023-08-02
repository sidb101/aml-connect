/**
 * This module would be used to communicate with the backend tauri application.
 * It will accept the data in required bindings and then give response back in terms of those bindings
 */
import type { ApiInterface } from "./ApiInterface";
import type { FilesUploadRequest } from "./bindings/FilesUploadRequest";
import { invoke } from "@tauri-apps/api/tauri";

const tauriApiClient: ApiInterface = {
	/**
	 * This method would send the files information to the backend
	 * @param filesUploadRequest: Request containing required information about files to be uploaded
	 */
	async uploadFiles(filesUploadRequest: FilesUploadRequest) {
		try {
			return await invoke("put_files", { input: filesUploadRequest });
		} catch (e) {
			console.error("Couldn't upload the files to backend.", e);
			return Promise.reject("Error in uploading the files.");
		}
	},
};

export default tauriApiClient;
