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

	// TODO: Update once backend is implemented
	createProject: async (
		length: number,
		projectName: string,
		projectDescription?: string
	): Promise<ShallowProjectDetails> => {
		const newProject: ShallowProjectDetails = {
			id: length + 1,
			slug: `new_project_${length + 1}`,
			name: projectName,
			description: projectDescription,
		};

		return Promise.resolve(newProject);
	},

	// TODO: Update once backend is implemented
	updateProject: async (
		projectSlug: string,
		projectName: string,
		projectDescription?: string
	): Promise<ShallowProjectDetails> => {
		// TODO: Remove when backend is implemented
		const dummyUpdatedProject: ShallowProjectDetails = {
			id: -1, // TODO: Use the id provided by the backend
			slug: projectSlug,
			name: projectName,
			description: projectDescription,
		};

		return Promise.resolve(dummyUpdatedProject);
	},

	// TODO: Update once backend is implemented
	deleteProject: async (projectSlug: string): Promise<void> => {
		// TODO: Delete the console.log(), only here as ESLINT doesn't like empty functions
		console.log("ESLINT doesn't like empty functions :(");
	},

	getAllProjects: async (): Promise<ShallowProjectDetails[]> => {
		const getProjectsResponse = await remoteClient.getAllProjects();
		return remoteTransformer.parseGetProjectsResponse(getProjectsResponse);
	},

	getAllElements: async (): Promise<Record<string, ElementT>> => {
		const getElementsResponse = await remoteClient.getAllElements();
		return remoteTransformer.parseGetElementsResponse(getElementsResponse);
	},

	simulateNetwork: async (
		network: NetworkT,
		projectSlug: string,
		inputFile: InputFileMetaDataT
	): Promise<Record<string, string>> => {
		//TODO: Perform the validations on network
		const simulationRequest: SimulateNetworkRequest = remoteTransformer.createSimulateRequest(
			network,
			projectSlug,
			inputFile
		);
		console.log(simulationRequest);
		//eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		// const simulationResponse = {} as SimulateNetworkResponse;
		const simulationResponse = await remoteClient.simulateNetwork(simulationRequest);
		console.log(simulationResponse);

		return remoteTransformer.parseSimulationResponse(simulationResponse);
	},
};

export default remoteService;
