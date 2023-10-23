import remoteClient from "./client/TauriApiClient";
import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "./client/bindings/FilesUploadRequest";
import remoteTransformer from "./RemoteTransformer";
import type { GetFilesRequest } from "./client/bindings/GetFilesRequest";
import { type NetworkT } from "../../redux/slices/ModelCreationSlice";
import type { SimulateNetworkRequest } from "./client/bindings/SimulateNetworkRequest";

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

	simulateNetwork: async (network: NetworkT, inputFile: InputFileMetaDataT): Promise<Record<string, number[]>> => {
		const simulationRequest: SimulateNetworkRequest = remoteTransformer.createSimulateRequest(network, inputFile);
		console.log("Request:", simulationRequest);

		const simulationResponse = await remoteClient.simulateNetwork(simulationRequest);
		console.log(simulationResponse);

		return remoteTransformer.parseSimulationResponse(simulationResponse);
	},
};

export default remoteService;
