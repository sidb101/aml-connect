/* eslint-disable   @typescript-eslint/consistent-type-definitions */

/**
 * This module would serve as interface with the Backend system. This can be any kind of server that performs processing
 * for app, like Web Server (HTTP), Rust Server (IPC), etc.
 * The api clients need to implement this interface, for the app to work correctly.
 * Right now, TauriAPI is implementing this interface.
 */
import type { FilesUploadRequest } from "./bindings/FilesUploadRequest";
import type { FilesUploadResponse } from "./bindings/FilesUploadResponse";
import type { GetFilesRequest } from "./bindings/GetFilesRequest";
import type { GetFilesResponse } from "./bindings/GetFilesResponse";
import type { SimulateNetworkRequest } from "./bindings/SimulateNetworkRequest";
import type { SimulateNetworkResponse } from "./bindings/SimulateNetworkResponse";
import type { ElementMetadata } from "./bindings/ElementMetadata";

export interface RemoteClient {
	/**
	 * This method would upload the files metadata to the backend, to perform validations
	 * and persistence.
	 * @param filesUploadRequest: Request containing the required data to upload the files
	 */
	uploadInputFiles(filesUploadRequest: FilesUploadRequest): Promise<FilesUploadResponse>;

	/**
	 * This method would get files metadata from the backend, that were uploaded by the user
	 * @param getFilesRequest: Request containing required data to get the files.
	 */
	getInputFiles(getFilesRequest: GetFilesRequest): Promise<GetFilesResponse>;

	/**
	 * This method would get all the elements supported by the simulator
	 */
	getAllElements(): Promise<Record<string, ElementMetadata>>;

	/**
	 * This method would simulate the given network as per the request
	 * @param simulateNetworkRequest: Request containing required data to get the files.
	 */
	simulateNetwork(simulateNetworkRequest: SimulateNetworkRequest): Promise<SimulateNetworkResponse>;
}
