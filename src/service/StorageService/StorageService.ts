import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import storageClient from "./client/TauriFsClient";
import type { OutputFileDataT, OutputFileMetaDataT } from "../../redux/slices/ResultSlice";

const storageService = {
	sendInputFilesToStorage: async (files: InputFileDataT[], path: string): Promise<InputFileDataT[]> => {
		//wait for all the files to get written
		return Promise.all(files.map(async (file) => storageClient.writeInputFileToStorage(file, path)));
	},

	readInputFilesFromStorage: async (filesMetaData: InputFileMetaDataT[], path: string): Promise<InputFileDataT[]> => {
		//get the files data along with content from the given metadata
		return Promise.all(
			filesMetaData.map(async (fileMetaData) => storageClient.readInputFileFromStorage(fileMetaData, path))
		);
	},

	readImageFileFromStorage: async (
		imageFileMetadata: OutputFileMetaDataT,
		path: string
	): Promise<OutputFileDataT> => {
		//get the image along with content from given metadata
		return storageClient.readImageFileFromStorage(imageFileMetadata, path);
	},

	readCodeFileFromStorage: async (codeFileMetaData: OutputFileMetaDataT, path: string): Promise<OutputFileDataT> => {
		//get the code along with content from given metadata
		return storageClient.readCodeFileFromStorage(codeFileMetaData, path);
	},
};

export default storageService;
