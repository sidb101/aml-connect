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
import type { SimulateNetworkRequest } from "./bindings/SimulateNetworkRequest";
import type { SimulateNetworkResponse } from "./bindings/SimulateNetworkResponse";
import type { ElementMetadata } from "./bindings/ElementMetadata";

class TauriApiClient implements RemoteClient {
	/**
	 * This method would send the files information to the backend
	 * @param filesUploadRequest: Request containing required information about files to be uploaded
	 */
	async uploadInputFiles(filesUploadRequest: FilesUploadRequest): Promise<FilesUploadResponse> {
		try {
			return await invoke("put_files", { input: filesUploadRequest });
		} catch (e) {
			console.error("Couldn't upload the files to backend.", e);
			return Promise.reject(e);
		}
	}

	/**
	 * This method would get the files metadata from the tauri backend.
	 * @param getFilesRequest: Request having the project slug and data type
	 */
	async getInputFiles(getFilesRequest: GetFilesRequest): Promise<GetFilesResponse> {
		try {
			return await invoke("get_files", { req: getFilesRequest });
		} catch (e) {
			console.error("Couldn't get the files from backend.", e);
			return Promise.reject(e);
		}
	}

	/**
	 * This method would get all the elements supported by the simulator
	 */
	async getAllElements(): Promise<Record<string, ElementMetadata>> {
		try {
			return await invoke("get_elements");
		} catch (e) {
			console.error("Couldn't get all the elements from backend.", e);
			return Promise.reject(e);
		}
	}

	async simulateNetwork(simulateNetworkRequest: SimulateNetworkRequest): Promise<SimulateNetworkResponse> {
		try {
			return await invoke("simulate_network", { req: simulateNetworkRequest });
		} catch (e) {
			console.error("Couldn't simulate the network", e);
			return Promise.reject(e);
		}
	}
}

const remoteClient: RemoteClient = new TauriApiClient();
export default remoteClient;
