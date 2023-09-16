import ImportLocalDataView from "./ImportLocalDataView";
import type { InputFileDataT } from "../../../../../redux/slices/DataHubSlice";
import { dataHubActions, DataSetT } from "../../../../../redux/slices/DataHubSlice";
import tauriFsClient from "../../../../../clients/fs/TauriFsClient";
import type { FilesUploadRequest } from "../../../../../clients/api/bindings/FilesUploadRequest";
import { createFilesUploadRequest, parseSuccessFilesUploadResponse } from "../../../../../clients/api/ApiTransformer";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { selectCurrentProjectAudioDir, selectCurrentProjectSlug } from "../../../../../redux/slices/GeneralSlice";
import tauriApiClient from "../../../../../clients/api/TauriApiClient";
import { useState } from "react";
import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import Spinner from "../../../../../components/spinner/Spinner";

export type ImportLocalDataT = {
	onClose: () => void;
};
/**
 * Module to handle all the functionalities regarding importing the data from local file system,
 * and providing a view for that
 * @param onClose: Method called when this component needs to be unmounted
 */
const ImportLocalData = ({ onClose }: ImportLocalDataT) => {
	const projectSlug = useAppSelector(selectCurrentProjectSlug);
	const audioProjectDir = useAppSelector(selectCurrentProjectAudioDir);

	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onFilesImport = async (files: InputFileDataT[]) => {
		//Put Backdrop
		setIsLoading(true);

		//wait for all the files to get written
		const importedFiles = await Promise.all(
			//TODO: create a directory for the project
			files.map(async (file) => await tauriFsClient.writeInputFileToStorage(file, audioProjectDir))
		);

		//call the server to send the files.
		console.log("Sending file meta data to server: ", importedFiles);
		await sendFilesMetaData(importedFiles);
	};

	const sendFilesMetaData = async (files: InputFileDataT[]) => {
		const filesUploadRequest: FilesUploadRequest = createFilesUploadRequest(projectSlug, files, DataSetT.TRAINING);
		try {
			//send it to the backend
			const filesUploadResponse = await tauriApiClient.uploadInputFiles(filesUploadRequest);
			console.log(filesUploadResponse);

			//parse the response
			const inputFiles = parseSuccessFilesUploadResponse(filesUploadResponse, files);

			//add the successfully uploaded files in the redux state
			if (inputFiles.length > 0) {
				dispatch(dataHubActions.addInputFiles({ dataSet: DataSetT.TRAINING, inputFiles: inputFiles }));
				// console.log("Updated The redux state.");
			}

			setIsLoading(false);
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<>
			{isLoading && <Spinner />}
			<ImportLocalDataView onClose={onClose} onFilesImport={onFilesImport} />
		</>
	);
};

export default ImportLocalData;
