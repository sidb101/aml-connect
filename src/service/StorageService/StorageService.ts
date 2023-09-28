import storageClient from "./client/TauriFSClient";
import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";

const storageService = {
	sendFilesToStorage: async (files: InputFileDataT[], path: string) => {
		//wait for all the files to get written
		return await Promise.all(files.map(async (file) => await storageClient.writeInputFileToStorage(file, path)));
	},

	readFilesFromStorage: async (filesMetaData: InputFileMetaDataT[], path: string) => {
		//get the files data along with content from the given metadata
		return await Promise.all(
			filesMetaData.map(async (fileMetaData) => await storageClient.readInputFileFromStorage(fileMetaData, path))
		);
	},
};

export default storageService;
