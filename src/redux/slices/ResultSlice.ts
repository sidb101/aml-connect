/**
 * This slice would deal with all the results from the created networks, which includes results
 * from single file simulation and multiple networks simulation as well.
 * The slice would give different actions that can be dispatched to update the
 * given result state
 */
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import type { Edge, EdgeChange, Node, NodeChange } from "reactflow";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { mockNetwork, mockNetworkMetaData } from "../../tests/mockdata/networkMock";

export type OutputFileDataT = {
	metadata: OutputFileMetaDataT;
	dataUrl: string;
};

export type OutputFileMetaDataT = {
	name: string;
	extension: string;
	mediaType: string;
};

export type SimulationResultT = {
	ranSimulation: boolean;
	vizFile: OutputFileDataT;
	codeFile: OutputFileDataT;
};
type ResultState = {
	simulationResult: SimulationResultT;
};

export const initialState: ResultState = {
	simulationResult: {
		ranSimulation: false,
		vizFile: {
			metadata: {
				name: "",
				extension: "",
				mediaType: "",
			},
			dataUrl: "",
		},
		codeFile: {
			metadata: {
				name: "",
				extension: "",
				mediaType: "",
			},
			dataUrl: "",
		},
	},
};

/**
 * The slice of the state that would define all the actions and reducers for this state
 */
export const resultSlice = createSlice({
	name: "result",
	initialState, // the type of this slice of the state would be inferred from the type of initial state
	reducers: {
		/**
		 * Sets the results for a given simulation network
		 * @param state Result state
		 * @param action The action would have the simulation result
		 */

		setSimulationResult: (state, action: PayloadAction<{ simulationResult: SimulationResultT }>) => {
			state.simulationResult = action.payload.simulationResult;
		},
	},
});

export const { reducer: resultReducer, actions: resultActions } = resultSlice;
