import RunSimulationView from "./RunSimulationView";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
	dataHubActions,
	DataSetT,
	type InputFileMetaDataT,
	selectInputFiles,
} from "../../../../redux/slices/DataHubSlice";
import { useEffect } from "react";
import { generalActions, selectLoading } from "../../../../redux/slices/GeneralSlice";
import remoteService from "../../../../service/RemoteService/RemoteService";
import {
	selectCurrentAudioPath,
	selectCurrentProjectSlug,
	selectCurrentTempPath,
} from "../../../../redux/slices/ProjectSlice";
import storageService from "../../../../service/StorageService/StorageService";
import { selectCurrentNetwork } from "../../../../redux/slices/ModelCreationSlice";
import { initialState as resultInitialState, resultActions } from "../../../../redux/slices/ResultSlice";

function RunSimulation() {
	//get the audio files for current project
	const trainingAudioFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.TRAINING));
	const testingAudioFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.TESTING));
	const validationAudioFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.VALIDATION));
	const projectSlug = useAppSelector(selectCurrentProjectSlug);
	const audioPath = useAppSelector(selectCurrentAudioPath);
	const tmpPath = useAppSelector(selectCurrentTempPath);
	const currentNetwork = useAppSelector(selectCurrentNetwork);
	const simulationResult = useAppSelector((state) => state.result.simulationResult);
	const isLoading = useAppSelector(selectLoading);

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
		dispatch(generalActions.markLoading(true));

		//Get all the required files asynchronously
		await Promise.all([
			(async () => {
				if (trainingAudioFiles.length <= 0) {
					await getInputFiles(DataSetT.TRAINING).catch((e) => {
						console.log("Error in getting Training Files", e);
					});
				}
			})(),
			(async () => {
				if (validationAudioFiles.length <= 0) {
					await getInputFiles(DataSetT.VALIDATION).catch((e) => {
						console.log("Error in getting Validation Files", e);
					});
				}
			})(),
			(async () => {
				if (testingAudioFiles.length <= 0) {
					await getInputFiles(DataSetT.TESTING).catch((e) => {
						console.log("Error in getting Testing Files", e);
					});
				}
			})(),
		]);

		dispatch(generalActions.markLoading(false));
	};

	/**
	 * Will get the input files metadata from the server, and then read the corresponding file binaries from the
	 * filesystem
	 * @param dataSet: The type of input files to be fetched.
	 */
	const getInputFiles = async (dataSet: DataSetT) => {
		//get the metadata from the server
		const inputFilesMetaData = await remoteService.getFilesMetaData(projectSlug, dataSet);
		//get the files data along with content from the given metadata
		const inputFiles = await storageService.readInputFilesFromStorage(inputFilesMetaData, audioPath);
		//update it in the redux state
		dispatch(dataHubActions.setInputFiles({ dataSet, inputFiles }));
	};

	const simulateNetwork = async (selectedFile: InputFileMetaDataT) => {
		dispatch(generalActions.markLoading(true));
		try {
			//get the response from backend
			const simulationResult = await remoteService.simulateNetwork(currentNetwork, projectSlug, selectedFile);

			//read the necessary files and fill the data content
			const [imageFile, codeFile] = await Promise.all([
				storageService.readImageFileFromStorage(simulationResult.vizFile.metadata, tmpPath),
				storageService.readCodeFileFromStorage(simulationResult.codeFile.metadata, tmpPath),
			]);

			//update the redux store with the result
			dispatch(
				resultActions.setSimulationResult({
					simulationResult: { ...simulationResult, vizFile: imageFile, codeFile: codeFile },
				})
			);
		} catch (e) {
			console.error("Couldn't get simulation result", e);
		}
		dispatch(generalActions.markLoading(false));
	};

	const handleInputFileChange = (selectedFile: InputFileMetaDataT) => {
		//reset the simulation result
		dispatch(resultActions.setSimulationResult({ simulationResult: resultInitialState.simulationResult }));
	};

	return (
		<>
			<RunSimulationView
				audioFiles={[...trainingAudioFiles, ...testingAudioFiles, ...validationAudioFiles]}
				onSimulate={simulateNetwork}
				onInputFileChange={handleInputFileChange}
				simulationResult={simulationResult}
			/>
		</>
	);
}

export default RunSimulation;
