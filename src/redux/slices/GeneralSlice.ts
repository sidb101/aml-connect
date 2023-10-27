import { createSlice } from "@reduxjs/toolkit";

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

export const { actions: generalActions } = generalSlice;

export default generalSlice.reducer;
