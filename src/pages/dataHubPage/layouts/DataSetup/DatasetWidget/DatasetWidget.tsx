import "./DatasetWidget.scss";
import AudioFileTable from "../AudioFileTable";
import Accordion from "../../../../../components/accordion/Accordion";
import { type ReactNode } from "react";
import { dataHubActions, DataSetT, selectInputFiles } from "../../../../../redux/slices/DataHubSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { selectCurrentAudioPath, selectCurrentProjectSlug } from "../../../../../redux/slices/ProjectSlice";
import remoteService from "../../../../../service/RemoteService/RemoteService";
import storageService from "../../../../../service/StorageService/StorageService";
import { generalActions } from "../../../../../redux/slices/GeneralSlice";

export type DatasetWidgetProps = {
	widgetHeight?: string;
	datasetType: DataSetT;
	header?: ReactNode;
	defaultIsOpen: boolean;
};

/**
 * Component to load the DataSet of given type. If the value in redux state is not present, then fetch it from
 * the server, else just use the values in the redux state.
 */
const DatasetWidget = ({ widgetHeight, datasetType, header, defaultIsOpen }: DatasetWidgetProps) => {
	const dispatch = useAppDispatch();

	const projectSlug = useAppSelector(selectCurrentProjectSlug);
	const audioPath = useAppSelector(selectCurrentAudioPath);

	const importedInputFiles = useAppSelector((state) => selectInputFiles(state, datasetType));

	//Handle when accordion is opened
	const handleAccordionOpen = () => {
		//If the input files are not present in the redux state, then fetch it from backend when accordion is open
		if (projectSlug !== "" && importedInputFiles.length === 0) {
			getInputFiles(datasetType).catch((e) => {
				console.error(e);
			});
		}
	};

	/**
	 * Will get the input files metadata from the server, and then read the corresponding file binaries from the
	 * filesystem
	 * @param dataSet: The type of input files to be fetched.
	 */
	const getInputFiles = async (dataSet: DataSetT) => {
		try {
			dispatch(generalActions.markLoading(true));

			//get the metadata from the server
			const inputFilesMetaData = await remoteService.getFilesMetaData(projectSlug, dataSet);

			//get the files data along with content from the given metadata
			const inputFiles = await storageService.readFilesFromStorage(inputFilesMetaData, audioPath);
			console.log("Read the files: ", inputFiles);

			//update it in the redux state
			dispatch(dataHubActions.setInputFiles({ dataSet, inputFiles }));

			console.log("Set input files in the redux state");
		} catch (e) {
			console.error("Error in getting files");
		}

		dispatch(generalActions.markLoading(false));
	};

	return (
		widgetHeight && (
			<Accordion
				bodyMaxHeight={widgetHeight}
				header={header}
				onOpen={() => {
					handleAccordionOpen();
					console.log(datasetType + " Opened");
				}}
				defaultIsOpen={defaultIsOpen}
			>
				<AudioFileTable files={importedInputFiles} />
			</Accordion>
		)
	);
};

export default DatasetWidget;
