import ImportLocalDataView from "./ImportLocalDataView";
import type { InputFileDataT } from "../../../../../redux/slices/DataHubSlice";
import { dataHubActions, DataSetT } from "../../../../../redux/slices/DataHubSlice";
import remoteService from "../../../../../service/RemoteService/RemoteService";
import storageService from "../../../../../service/StorageService/StorageService";
import { AUDIO_DIR } from "../../../../../constants";
import { generalActions } from "../../../../../redux/slices/GeneralSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { selectCurrentProject } from "../../../../../redux/slices/ProjectsSlice";

export type ImportLocalDataT = {
	onClose: () => void;
};
/**
 * Module to handle all the functionalities regarding importing the data from local file system,
 * and providing a view for that
 * @param onClose: Method called when this component needs to be unmounted
 */
const ImportLocalData = ({ onClose }: ImportLocalDataT) => {
	const dispatch = useAppDispatch();

	const currentProject = useAppSelector(selectCurrentProject);
	const audioPath = `${currentProject?.slug || ""}/${AUDIO_DIR}`;

	/**
	 * Actions to do when user uploads the files
	 */
	const onFilesImport = async (files: InputFileDataT[]) => {
		dispatch(generalActions.setLoading());
		try {
			//Write the files
			await storageService.sendFilesToStorage(files, audioPath);

			//Send the metadata to the server
			const inputFiles = await remoteService.sendFilesMetaData(
				currentProject?.slug || "",
				files,
				DataSetT.TRAINING
			);

			//add the successfully uploaded files in the redux state
			if (inputFiles.length > 0) {
				dispatch(dataHubActions.addInputFiles({ dataSet: DataSetT.TRAINING, inputFiles: inputFiles }));
				// console.log("Updated The redux state.");
			}
		} catch (e) {
			console.error(e);
		}

		dispatch(generalActions.unsetLoading());
	};

	return (
		<>
			<ImportLocalDataView onClose={onClose} onFilesImport={onFilesImport} />
		</>
	);
};

export default ImportLocalData;
