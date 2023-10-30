/**
 * This slice would deal with all the global parts of the state, that are used
 * throughout the application, across various slices.
 * The slice would give different actions that can be dispatched to update the
 * given general state
 */

import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type GeneralState = {
	isLoading: boolean; //To show spinner when app has to wait for any kind of call
};

const initialState: GeneralState = {
	isLoading: false,
};

const generalSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
		/**
		 * To set the loading status for the whole application
		 * @param state General state.
		 */
		setLoading: (state) => {
			state.isLoading = true;
		},

		/**
		 * To unset the loading status for the whole application
		 * @param state General state.
		 */
		unsetLoading: (state) => {
			state.isLoading = false;
		},
	},
});

/**
 * Different App Selectors
 */

export const selectIsLoading = createSelector(
	(state: RootState) => state.general.isLoading,
	(isLoading) => isLoading
);

export const { actions: generalActions } = generalSlice;

export default generalSlice.reducer;
