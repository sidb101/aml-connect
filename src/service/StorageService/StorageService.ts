import storageClient from "./client/TauriFSClient";
import type { InputFileDataT } from "../../redux/slices/DataHubSlice";

const storageService = {
	sendFilesToStorage: async (files: InputFileDataT[], path: string) => {
		//wait for all the files to get written
		return await Promise.all(files.map(async (file) => await storageClient.writeInputFileToStorage(file, path)));
	},
};

export default storageService;
