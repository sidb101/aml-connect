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
import type { ListProjectsRequest } from "./bindings/ListProjectsRequest";
import type { ListProjectsResponse } from "./bindings/ListProjectsResponse";
import type { CreateProjectRequest } from "./bindings/CreateProjectRequest";
import type { CreateProjectResponse } from "./bindings/CreateProjectResponse";

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
	 * This method would create a new project on the backend.
	 * @param createProjectRequest Request containing the required data to create a new project.
	 */
	createProject(createProjectRequest: CreateProjectRequest): Promise<CreateProjectResponse>;

	/**
	 * This method would get the projects from the backend.
	 * @param getProjectsRequest Request containing the projects.
	 */
	getProjects(getProjectsRequest: ListProjectsRequest): Promise<ListProjectsResponse>;
}
