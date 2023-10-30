/**
 * This slice would deal with all the global parts of the state, that are used
 * throughout the application, across various slices.
 * The slice would give different actions that can be dispatched to update the
 * given general state
 */

import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
		 * To set the loading/unloading status for the whole application
		 * @param state: General State
		 * @param action: Boolean specifying whether the app has to be marked as loading or not
		 */
		markLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
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
