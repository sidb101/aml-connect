import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "./client/bindings/FilesUploadRequest";
import type { FilesUploadResponse } from "./client/bindings/FilesUploadResponse";
import type { GetFilesRequest } from "./client/bindings/GetFilesRequest";
import type { GetFilesResponse } from "./client/bindings/GetFilesResponse";
import type { SimulateNetworkRequest } from "./client/bindings/SimulateNetworkRequest";
import type { NetworkT } from "../../redux/slices/ModelCreationSlice";
import type { Network } from "./client/bindings/Network";
import type { SimulateNetworkResponse } from "./client/bindings/SimulateNetworkResponse";
/* eslint-disable  @typescript-eslint/naming-convention */

/***
 * This object would convert the UI objects to Data Transfer Objects (DTO) that can be used to communicate with the
 * Remote backend.
 */
const remoteTransformer = {
	createFilesUploadRequest(projectSlug: string, inputFiles: InputFileDataT[], dataSet: DataSetT): FilesUploadRequest {
		return {
			proj_slug: projectSlug,
			input_files: inputFiles.map((inputFile) => ({
				file_name: inputFile.metadata.name,
				dataset_type: dataSet,
			})),
		};
	},

	parseSuccessFilesUploadResponse(
		filesUploadResponse: FilesUploadResponse,
		inputFiles: InputFileDataT[]
	): InputFileDataT[] {
		const successfulUploads = filesUploadResponse.upload_success_files;
		return inputFiles.filter((inputFile) =>
			successfulUploads.find((successFile) => successFile.file_name === inputFile.metadata.name)
		);
	},

	createFilesGetRequest(projectSlug: string, dataSet: DataSetT): GetFilesRequest {
		return {
			proj_slug: projectSlug,
			dataset_type: dataSet,
		};
	},

	parseFilesGetResponse(filesGetResponse: GetFilesResponse): InputFileMetaDataT[] {
		const { files } = filesGetResponse;

		//read the content of all the files in the
		return files.map((file) => {
			const extension = this.getFileExtension(file.file_name);
			return {
				name: file.file_name,
				extension,
				mediaType: `audio/${extension}`, //TODO: Maybe think about if we want to store various mediaTypes, or somehow deduce it from the file data itself.
			};
		});
	},

	createSimulateRequest(network: NetworkT, inputFile: InputFileMetaDataT): SimulateNetworkRequest {
		const networkToSimulate: Network = {
			id: network.metaData.id,
			creator_id: 1n,
			name: network.metaData.name,
			elements: network.nodes.map((node) => ({
				id: node.id,
				parent_network_id: network.metaData.id,
				type_name: node.data.elementType,
				element_type_params: network.params[node.id],
				terminals: [],
				position: {
					x: node.position.x,
					y: node.position.y,
				},
			})),
			nodes: network.edges.map((edge) => ({
				id: edge.id,
				name: "",
				parent_network_id: network.metaData.id,
				terminal_ids: [],
			})),
		};

		return {
			network: networkToSimulate,
			input_file_path: inputFile.name,
		};
	},

	parseSimulationResponse(simulateNetworkResponse: SimulateNetworkResponse): Record<string, number[]> {
		return simulateNetworkResponse.response;
	},

	getFileExtension(fileName: string): string {
		const tokens = fileName.split(".");
		if (tokens.length < 2) {
			//means the extension is not present
			throw new Error("File needs a valid extension.");
		}

		return tokens[tokens.length - 1];
	},
};

export default remoteTransformer;
