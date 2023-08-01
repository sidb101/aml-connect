import ImportLocalDataView, { type ImportDataFileT } from "./ImportLocalDataView";
import { BaseDirectory, writeBinaryFile } from "@tauri-apps/api/fs";

export type ImportLocalDataT = {
	data?: string;
};
/**
 * Module to handle all the functionalities regarding importing the data from local file system,
 * and providing a view for that
 */
const ImportLocalData = (props: ImportLocalDataT) => {
	const handleFilesImport = async (files: ImportDataFileT[]) => {
		files.forEach((file) => writeToAppDir(file));
	};

	const writeToAppDir = async (file: ImportDataFileT) => {
		const blob = await (await fetch(file.dataUrl)).blob();
		const fileBinary = await blob.arrayBuffer();
		await writeBinaryFile(file.name, fileBinary, { dir: BaseDirectory.AppLocalData });
	};

	const handleImportError = (e: Error) => console.error("Couldn't Import Files", e);

	return (
		<>
			<ImportLocalDataView handleFilesImport={handleFilesImport} handleFilesImportError={handleImportError} />
		</>
	);
};

export default ImportLocalData;
