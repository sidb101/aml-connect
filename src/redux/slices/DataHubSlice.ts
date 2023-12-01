/**
 * This slice would deal with all the basic data related parts of the state, which are
 * mostly data and meta-data of the audio files
 * The slice would give different actions that can be dispatched to update the
 * given data hub state
 */
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";

export type DataHubState = {
	inputDataFiles: InputFilesT;
};

export type InputFilesT = {
	[dataSet in DataSetT]: InputFileDataT[];
};

export type InputFileDataT = {
	metadata: InputFileMetaDataT;
	dataUrl: string;
};

export type InputFileMetaDataT = {
	name: string;
	extension: string;
	mediaType: string;
	length?: string;
};

export enum DataSetT {
	//The String values are consistent with the backend contract
	TESTING = "Testing",
	VALIDATION = "Validation",
	TRAINING = "Training",
}

const initialInputFiles: InputFilesT = {
	//These attributes are consistent with the Enum Values of DataSetT
	Testing: [] /* eslint-disable-line @typescript-eslint/naming-convention */,
	Validation: [] /* eslint-disable-line @typescript-eslint/naming-convention */,
	Training: [] /* eslint-disable-line @typescript-eslint/naming-convention */,
};

const initialState: DataHubState = {
	inputDataFiles: initialInputFiles,
};

/**
 * The slice of the state that would define all the actions and reducers for this state
 */
export const dataHubSlice = createSlice({
	name: "dataHub",
	initialState, // the type of this slice of the state would be inferred from the type of initial state
	reducers: {
		/**
		 * To set the input files for appropriate data set.
		 * @param state: Data hub State
		 * @param action: The action would have dataSet and input files to be set
		 */
		setInputFiles: (state, action: PayloadAction<{ dataSet: DataSetT; inputFiles: InputFileDataT[] }>) => {
			state.inputDataFiles[action.payload.dataSet] = action.payload.inputFiles;
		},
		/**
		 * To set the input files for all the data sets.
		 * @param state: Data hub State
		 * @param action: The action would have dataSet mapped to input files to be set
		 */
		setAllInputFiles: (state, action: PayloadAction<Map<DataSetT, InputFileDataT[]>>) => {
			state.inputDataFiles.Training = action.payload.get(DataSetT.TRAINING) || [];
			state.inputDataFiles.Validation = action.payload.get(DataSetT.VALIDATION) || [];
			state.inputDataFiles.Testing = action.payload.get(DataSetT.TESTING) || [];
		},
		/**
		 * To add the input files into appropriate data set.
		 * @param state: Data hub State
		 * @param action: The action would have dataSet and input files to be added
		 */
		addInputFiles: (state, action: PayloadAction<{ dataSet: DataSetT; inputFiles: InputFileDataT[] }>) => {
			const { dataSet, inputFiles } = action.payload;

			//Handle the duplicate file names. If a file already exists, then overwrite that file.
			//Remove the old files of same name from the state
			state.inputDataFiles[dataSet] = state.inputDataFiles[dataSet].filter((stateFile) =>
				inputFiles.some((inputFile) => stateFile.metadata.name !== inputFile.metadata.name)
			);

			state.inputDataFiles[dataSet] = [...state.inputDataFiles[dataSet], ...inputFiles];
		},

		/**
		 * To reset the state when the project is closed.
		 * @param state: Data hub State
		 */
		resetState: (state) => {
			state.inputDataFiles = initialInputFiles;
		},
	},
});

export const selectInputFiles = createSelector(
	[(state: RootState) => state.dataHub, (_, dataSet: DataSetT) => dataSet],
	(state, dataSet) => state.inputDataFiles[dataSet]
);

export const selectAllInputFiles = createSelector(
	(state: RootState) => state.dataHub,
	(state) => {
		return state.inputDataFiles;
	}
);

export const { name: dataHubSliceKey, reducer: dataHubReducer, actions: dataHubActions } = dataHubSlice;
