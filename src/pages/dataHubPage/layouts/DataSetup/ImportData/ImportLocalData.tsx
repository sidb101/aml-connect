import ImportLocalDataView from "./ImportLocalDataView";
import type { InputFileDataT } from "../../../../../redux/slices/DataHubSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { selectCurrentProjectAudioDir, selectCurrentProjectSlug } from "../../../../../redux/slices/GeneralSlice";
import { useState } from "react";

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
		//TODO: Write logic to write the files
		await sendFilesMetaData(files);
	};

	const sendFilesMetaData = async (files: InputFileDataT[]) => {
		//TODO: Write logic to send files meta data to server
	};
	return (
		<>
			<ImportLocalDataView onClose={onClose} onFilesImport={onFilesImport} />
		</>
	);
};

export default ImportLocalData;
