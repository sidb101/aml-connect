import ImportLocalDataView from "./ImportLocalDataView";
import { AUDIO_DIR } from "../../../../../constants";
import type { InputFileDataT } from "../../../../../redux/slices/DataHubSlice";
import { dataHubActions, DataSetT } from "../../../../../redux/slices/DataHubSlice";
import tauriFsClient from "../../../../../clients/fs/TauriFsClient";
import type { FilesUploadRequest } from "../../../../../clients/api/bindings/FilesUploadRequest";
import { createFilesUploadRequest, parseSuccessFilesUploadResponse } from "../../../../../clients/api/ApiTransformer";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../../redux/slices/GeneralSlice";
import tauriApiClient from "../../../../../clients/api/TauriApiClient";

export type ImportLocalDataT = {
	data?: string;
};
/**
 * Module to handle all the functionalities regarding importing the data from local file system,
 * and providing a view for that
 */
const ImportLocalData = (props: ImportLocalDataT) => {
	const projectSlug = useAppSelector(selectCurrentProjectSlug);

	const dispatch = useAppDispatch();

	const handleFilesImport = async (files: InputFileDataT[]) => {
		//wait for all the files to get written
		const importedFiles = await Promise.all(
			files.map(async (file) => await tauriFsClient.writeFileToAppStorage(file, `${projectSlug}/audio`))
		);

		//call the server to send the files.
		console.log("Sending file meta data to server: ", importedFiles);
		sendFilesMetaData(importedFiles).catch((e) => console.error(e));
	};

	const sendFilesMetaData = async (files: InputFileDataT[]) => {
		const filesUploadRequest: FilesUploadRequest = createFilesUploadRequest(projectSlug, files, DataSetT.TRAINING);
		try {
			//send it to the backend
			const filesUploadResponse = await tauriApiClient.uploadFiles(filesUploadRequest);
			if (filesUploadResponse.upload_failed_files.length > 0) {
				console.log("Some files failed to upload", filesUploadResponse.upload_failed_files);
			} else {
				console.log("All the files uploaded successfully", filesUploadResponse.upload_success_files);
			}

			//update it in the redux state
			const successFulFileUploads = parseSuccessFilesUploadResponse(filesUploadResponse, files);
			dispatch(dataHubActions.addInputFiles({ dataSet: DataSetT.TRAINING, inputFiles: successFulFileUploads }));
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<>
			<ImportLocalDataView handleFilesImport={handleFilesImport} />
		</>
	);
};

export default ImportLocalData;
