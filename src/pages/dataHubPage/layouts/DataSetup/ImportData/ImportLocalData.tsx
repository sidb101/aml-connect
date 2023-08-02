import ImportLocalDataView from "./ImportLocalDataView";
import { AUDIO_DIR } from "../../../../../constants";
import type { InputFileDataT } from "../../../../../redux/slices/DataHubSlice";
import tauriFsClient from "../../../../../clients/fs/TauriFsClient";

export type ImportLocalDataT = {
	data?: string;
};
/**
 * Module to handle all the functionalities regarding importing the data from local file system,
 * and providing a view for that
 */
const ImportLocalData = (props: ImportLocalDataT) => {
	const handleFilesImport = async (files: InputFileDataT[]) => {
		//wait for all the files to get written
		const importedFiles = await Promise.all(
			files.map(async (file) => await tauriFsClient.writeFileToAppStorage(file, AUDIO_DIR))
		);

		//call the server to send the files.
		console.log("Sending file meta data to server: ", importedFiles);
	};
	return (
		<>
			<ImportLocalDataView handleFilesImport={handleFilesImport} />
		</>
	);
};

export default ImportLocalData;
