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

/**
 * The slice of the state that would define all the actions and reducers for this state
 */
export const generalSlice = createSlice({
	name: "general",
	initialState, // the type of this slice of the state would be inferred from the type of initial state
	reducers: {
		// the keys of this object would also become the actions for this slice

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

export const selectLoading = createSelector(
	(state: RootState) => state.general,
	({ isLoading }) => isLoading
);

export const { name: generalSliceKey, reducer: generalReducer, actions: generalActions } = generalSlice;
