/**
 * This slice would deal with all the basic data related parts of the state, which are
 * mostly data and meta-data of the audio files
 * The slice would give different actions that can be dispatched to update the
 * given data hub state
 */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generalSlice } from "./GeneralSlice";

export type DataHubState = {
	[dataSet in DataSetT]: InputFileDataT[];
};

export type InputFileDataT = {
	metadata: InputFileMetaDataT;
	dataUrl: string;
};

export type InputFileMetaDataT = {
	name: string;
	length?: string;
};

export enum DataSetT {
	TESTING = "Testing",
	VALIDATION = "Validation",
	TRAINING = "Training",
}

const initialState: DataHubState = {
	Testing: [],
	Validation: [],
	Training: [],
};

/**
 * The slice of the state that would define all the actions and reducers for this state
 */
export const dataHubSlice = createSlice({
	name: "dataHub",
	initialState, // the type of this slice of the state would be inferred from the type of initial state
	reducers: {
		/**
		 * To add the input files into appropriate data set.
		 * @param state: Data hub State
		 * @param action: The action would have dataSet and input files to be added
		 */
		addInputFiles: (state, action: PayloadAction<{ dataSet: DataSetT; inputFiles: InputFileDataT[] }>) => {
			state[action.payload.dataSet] = [...state[action.payload.dataSet], ...action.payload.inputFiles];
		},
	},
});

export const { name: dataHubSliceKey, reducer: dataHubReducer, actions: dataHubActions } = dataHubSlice;
