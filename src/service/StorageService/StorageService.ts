import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import storageClient from "./client/TauriFsClient";

const storageService = {
	sendFilesToStorage: async (files: InputFileDataT[], path: string): Promise<InputFileDataT[]> => {
		//wait for all the files to get written
		return Promise.all(files.map(async (file) => storageClient.writeInputFileToStorage(file, path)));
	},

	readFilesFromStorage: async (filesMetaData: InputFileMetaDataT[], path: string): Promise<InputFileDataT[]> => {
		//get the files data along with content from the given metadata
		return Promise.all(
			filesMetaData.map(async (fileMetaData) => storageClient.readInputFileFromStorage(fileMetaData, path))
		);
	},
};

export default storageService;
