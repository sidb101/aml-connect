import RunSimulationView from "./RunSimulationView";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
	dataHubActions,
	DataSetT,
	type InputFileMetaDataT,
	selectInputFiles,
} from "../../../../redux/slices/DataHubSlice";
import { useEffect } from "react";
import { generalActions } from "../../../../redux/slices/GeneralSlice";
import remoteService from "../../../../service/RemoteService/RemoteService";
import { selectCurrentAudioPath, selectCurrentProjectSlug } from "../../../../redux/slices/ProjectSlice";
import storageService from "../../../../service/StorageService/StorageService";
import { audioFilesMock } from "../../../../tests/mockdata/audioFilesMock";
import { selectCurrentNetwork } from "../../../../redux/slices/ModelCreationSlice";
import { AUDIO_DIR } from "../../../../constants";

function RunSimulation() {
	//get the audio files for current project
	const trainingAudioFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.TRAINING));
	const testingAudioFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.TESTING));
	const validationAudioFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.VALIDATION));
	const projectSlug = useAppSelector(selectCurrentProjectSlug);
	const audioPath = useAppSelector(selectCurrentAudioPath);
	const currentNetwork = useAppSelector(selectCurrentNetwork);

	const dispatch = useAppDispatch();

	//Load the initial data if not loaded
	useEffect(() => {
		//if any of the dataset is not loaded, try to load all the files
		if (trainingAudioFiles.length <= 0 || testingAudioFiles.length <= 0 || validationAudioFiles.length <= 0) {
			getAllInputFiles().catch((e) => {
				console.log("Error in getting files", e);
			});
		}
	}, []);

	/**
	 * Read all the input files metadata from the server, and then read the corresponding file binaries from the
	 * filesystem
	 */
	const getAllInputFiles = async () => {
		console.log("Getting all files..");
		dispatch(generalActions.markLoading(true));

		//Get all the required files asynchronously
		await Promise.all([
			(async () => {
				// console.log("Checking audio files for Training", trainingAudioFiles);
				if (trainingAudioFiles.length <= 0) {
					await getInputFiles(DataSetT.TRAINING).catch((e) => {
						console.log("Error in getting Training Files", e);
					});
				}
			})(),
			(async () => {
				// console.log("Checking audio files for Validation", validationAudioFiles);
				if (validationAudioFiles.length <= 0) {
					await getInputFiles(DataSetT.VALIDATION).catch((e) => {
						console.log("Error in getting Validation Files", e);
					});
				}
			})(),
			(async () => {
				// console.log("Checking audio files for Testing", testingAudioFiles);
				if (testingAudioFiles.length <= 0) {
					await getInputFiles(DataSetT.TESTING).catch((e) => {
						console.log("Error in getting Testing Files", e);
					});
				}
			})(),
		]);

		dispatch(generalActions.markLoading(false));
		console.log("Marked Unloading");
	};

	/**
	 * Will get the input files metadata from the server, and then read the corresponding file binaries from the
	 * filesystem
	 * @param dataSet: The type of input files to be fetched.
	 */
	const getInputFiles = async (dataSet: DataSetT) => {
		console.log("Getting audio files for : ", dataSet);
		//get the metadata from the server
		const inputFilesMetaData = await remoteService.getFilesMetaData(projectSlug, dataSet);
		//get the files data along with content from the given metadata
		const inputFiles = await storageService.readFilesFromStorage(inputFilesMetaData, audioPath);
		//update it in the redux state
		dispatch(dataHubActions.setInputFiles({ dataSet, inputFiles }));
	};

	const simulateNetwork = (selectedFile: InputFileMetaDataT) => {
		remoteService.simulateNetwork(currentNetwork, projectSlug, selectedFile).catch((e) => {
			console.error("Couldn't simulate", e);
		});
	};

	return (
		<>
			<RunSimulationView
				audioFiles={[...trainingAudioFiles, ...testingAudioFiles, ...validationAudioFiles]}
				onSimulate={simulateNetwork}
			/>
		</>
	);
}

export default RunSimulation;
