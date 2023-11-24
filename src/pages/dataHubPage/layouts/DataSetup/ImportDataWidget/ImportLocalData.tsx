import ImportLocalDataView from "./ImportLocalDataView";
import type { InputFileDataT } from "../../../../../redux/slices/DataHubSlice";
import { dataHubActions, DataSetT } from "../../../../../redux/slices/DataHubSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { selectCurrentAudioPath, selectCurrentProjectSlug } from "../../../../../redux/slices/ProjectSlice";
import remoteService from "../../../../../service/RemoteService/RemoteService";
import storageService from "../../../../../service/StorageService/StorageService";
import { generalActions } from "../../../../../redux/slices/GeneralSlice";

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
	const audioPath = useAppSelector(selectCurrentAudioPath);

	const dispatch = useAppDispatch();

	/**
	 * Actions to do when user uploads the files
	 */
	const onFilesImport = async (files: InputFileDataT[]) => {
		dispatch(generalActions.markLoading(true));
		try {
			//Write the files
			await storageService.sendFilesToStorage(files, audioPath);

			//Send the metadata to the server
			const inputFiles = await remoteService.sendFilesMetaData(projectSlug, files, DataSetT.TRAINING);

			//add the successfully uploaded files in the redux state
			if (inputFiles.length > 0) {
				dispatch(dataHubActions.addInputFiles({ dataSet: DataSetT.TRAINING, inputFiles: inputFiles }));
			}
		} catch (e) {
			console.error(e);
		}

		dispatch(generalActions.markLoading(false));
	};

	return (
		<>
			<ImportLocalDataView onClose={onClose} onFilesImport={onFilesImport} />
		</>
	);
};

export default ImportLocalData;
