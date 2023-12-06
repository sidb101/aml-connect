import remoteClient from "./client/TauriApiClient";
import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "./client/bindings/FilesUploadRequest";
import remoteTransformer from "./RemoteTransformer";
import type { GetFilesRequest } from "./client/bindings/GetFilesRequest";
import { type ElementT, type NetworkT } from "../../redux/slices/ModelCreationSlice";
import type { SimulateNetworkRequest } from "./client/bindings/SimulateNetworkRequest";
import type { ShallowProjectDetails } from "../../redux/slices/ProjectSlice";
import type { SimulateNetworkResponse } from "./client/bindings/SimulateNetworkResponse";
import type { SimulationResultT } from "../../redux/slices/ResultSlice";
import type { DeleteProjectRequest } from "./client/bindings/DeleteProjectRequest";
import type { CreateProjectRequest } from "./client/bindings/CreateProjectRequest";
import type { UpdateProjectRequest } from "./client/bindings/UpdateProjectRequest";

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

		return remoteTransformer.parseSuccessFilesUploadResponse(filesUploadResponse, files);
	},

	getFilesMetaData: async (projectSlug: string, dataSet: DataSetT): Promise<InputFileMetaDataT[]> => {
		//get the files information
		const filesGetRequest: GetFilesRequest = remoteTransformer.createFilesGetRequest(projectSlug, dataSet);

		const filesGetResponse = await remoteClient.getInputFiles(filesGetRequest);

		const inputFilesMetaData: InputFileMetaDataT[] = remoteTransformer.parseFilesGetResponse(filesGetResponse);

		return inputFilesMetaData;
	},

	createProject: async (projectName: string, projectDescription?: string): Promise<ShallowProjectDetails> => {
		const createProjectRequest: CreateProjectRequest = remoteTransformer.createProjectRequest(
			projectName,
			projectDescription
		);

		const createProjectResponse = await remoteClient.createProject(createProjectRequest);

		return remoteTransformer.parseCreateProjectResponse(createProjectResponse);
	},

	updateProject: async (
		projectId: number,
		projectName: string,
		projectDescription?: string
	): Promise<ShallowProjectDetails> => {
		const updateProjectRequest: UpdateProjectRequest = remoteTransformer.createUpdateProjectRequest(
			projectId,
			projectName,
			projectDescription
		);

		const updateProjectResponse = await remoteClient.updateProject(updateProjectRequest);

		return remoteTransformer.parseUpdateProjectResponse(updateProjectResponse);
	},

	getAllProjects: async (): Promise<ShallowProjectDetails[]> => {
		const getProjectsResponse = await remoteClient.getAllProjects();
		return remoteTransformer.parseGetProjectsResponse(getProjectsResponse);
	},

	deleteProject: async (projectId: number): Promise<void> => {
		const deleteProjectRequest: DeleteProjectRequest = remoteTransformer.createDeleteProjectRequest(projectId);

		const deleteProjectResponse = await remoteClient.deleteProject(deleteProjectRequest);
	},

	getAllElements: async (): Promise<Record<string, ElementT>> => {
		const getElementsResponse = await remoteClient.getAllElements();
		return remoteTransformer.parseGetElementsResponse(getElementsResponse);
	},

	simulateNetwork: async (
		network: NetworkT,
		projectSlug: string,
		inputFile: InputFileMetaDataT
	): Promise<SimulationResultT> => {
		//TODO: Perform the validations on network
		const simulationRequest: SimulateNetworkRequest = remoteTransformer.createSimulateRequest(
			network,
			projectSlug,
			inputFile
		);
		console.log(simulationRequest);
		const simulationResponse = await remoteClient.simulateNetwork(simulationRequest);
		console.log(simulationResponse);

		return remoteTransformer.parseSimulationResponse(simulationResponse);
	},
};

export default remoteService;
