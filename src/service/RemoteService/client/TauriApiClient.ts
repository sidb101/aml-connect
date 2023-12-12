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
import type { CreateProjectRequest } from "./bindings/CreateProjectRequest";
import type { CreateProjectResponse } from "./bindings/CreateProjectResponse";
import type { GetProjectsResponse } from "./bindings/GetProjectsResponse";
import type { UpdateProjectRequest } from "./bindings/UpdateProjectRequest";
import type { UpdateProjectResponse } from "./bindings/UpdateProjectResponse";
import type { DeleteProjectRequest } from "./bindings/DeleteProjectRequest";
import type { DeleteProjectResponse } from "./bindings/DeleteProjectResponse";

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

	async createProject(createProjectRequest: CreateProjectRequest): Promise<CreateProjectResponse> {
		try {
			return await invoke("create_project", { req: createProjectRequest });
		} catch (e) {
			console.error("Couldn't create project in the backend", e);
			return Promise.reject(e);
		}
	}

	async getAllProjects(): Promise<GetProjectsResponse> {
		try {
			return await invoke("get_projects");
		} catch (e) {
			console.error("Couldn't get all projets from backend", e);
			return Promise.reject(e);
		}
	}

	async updateProject(updateProjectRequest: UpdateProjectRequest): Promise<UpdateProjectResponse> {
		try {
			return await invoke("update_project", { req: updateProjectRequest });
		} catch (e) {
			console.error("Couldn't get update the project in the backend", e);
			return Promise.reject(e);
		}
	}

	async deleteProject(deleteProjectRequest: DeleteProjectRequest): Promise<DeleteProjectResponse> {
		try {
			return await invoke("delete_project", { req: deleteProjectRequest });
		} catch (e) {
			console.error("Couldn't delete project from the backend", e);
			return Promise.reject(e);
		}
	}
}

const remoteClient: RemoteClient = new TauriApiClient();
export default remoteClient;
