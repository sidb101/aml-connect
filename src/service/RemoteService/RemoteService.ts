import remoteClient from "./client/TauriApiClient";
import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "./client/bindings/FilesUploadRequest";
import remoteTransformer from "./RemoteTransformer";
import type { GetFilesRequest } from "./client/bindings/GetFilesRequest";
import type { ListProjectsRequest } from "./client/bindings/ListProjectsRequest";
import type { ListProjectsResponse } from "./client/bindings/ListProjectsResponse";
import type { ProjectDetails } from "./client/bindings/ProjectDetails";
import { projectCards } from "../../tests/mockdata/allProjectCards";
import type { CreateProjectRequest } from "./client/bindings/CreateProjectRequest";

/**
 * Object responsible for Transforming the UI Data to required Backend DTOs and then call the Backend using
 * its respective client
 */

const remoteService = {
	/**
	 * Sends the given files metadata to the backend for given project slugs
	 */
	sendFilesMetaData: async (
		projectSlug: string,
		files: InputFileDataT[],
		dataSet: DataSetT
	): Promise<InputFileDataT[]> => {
		const filesUploadRequest: FilesUploadRequest = remoteTransformer.createFilesUploadRequest(
			projectSlug,
			files,
			dataSet
		);

		//send it to the backend
		const filesUploadResponse = await remoteClient.uploadInputFiles(filesUploadRequest);
		console.log(filesUploadResponse);
		return remoteTransformer.parseSuccessFilesUploadResponse(filesUploadResponse, files);
	},

	getFilesMetaData: async (projectSlug: string, dataSet: DataSetT): Promise<InputFileMetaDataT[]> => {
		//get the files information
		const filesGetRequest: GetFilesRequest = remoteTransformer.createFilesGetRequest(projectSlug, dataSet);
		console.log("Request", filesGetRequest);

		const filesGetResponse = await remoteClient.getInputFiles(filesGetRequest);
		console.log(filesGetResponse);

		const inputFilesMetaData: InputFileMetaDataT[] = remoteTransformer.parseFilesGetResponse(filesGetResponse);
		console.log("Transformed: ", inputFilesMetaData);

		return inputFilesMetaData;
	},

	createProject: async (projectName: string, projectDescription: string): Promise<ProjectDetails[]> => {
		const createProjectRequest: CreateProjectRequest = remoteTransformer.createTheCreateProjectRequest(
			projectName,
			projectDescription
		);
		console.log("Request", createProjectRequest);

		let createProjectResponse;

		try {
			createProjectResponse = await remoteClient.createProject(createProjectRequest);
			console.log(createProjectResponse);
		} catch (e) {
			console.error("Couldn't create a new project on the backend.", e);

			// TODO: Delete everything below once backend is implemented
			const newProject: ProjectDetails = {
				id: projectCards.length + 1,
				slug: `dummy_project_${projectCards.length + 1}`,
				name: projectName,
				description: projectDescription,
			};

			//projectCards.push(newProject);

			return Promise.resolve(projectCards);
		}

		const projects = remoteTransformer.parseCreateProjectResponse(createProjectResponse);
		console.log("Transformed: ", projects);

		return projects;
	},

	getProjects: async (): Promise<ProjectDetails[]> => {
		const getProjectsRequest: ListProjectsRequest = remoteTransformer.createGetProjectsRequest(
			BigInt(100),
			BigInt(0)
		);
		console.log("Request", getProjectsRequest);

		let getProjectsResponse: ListProjectsResponse;

		try {
			getProjectsResponse = await remoteClient.getProjects(getProjectsRequest);
			console.log(getProjectsResponse);
		} catch (e) {
			console.error("Couldn't get the projects from the backend.", e);
			return Promise.resolve(projectCards); // TODO: Delete this line once backend is implemented
		}

		const projects = remoteTransformer.parseGetProjectsResponse(getProjectsResponse);
		console.log("Transformed: ", projects);

		return projects;
	},
};

export default remoteService;
