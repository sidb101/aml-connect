import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { generalReducer } from "./slices/GeneralSlice";

export const store = configureStore({
	reducer: {
		general: generalReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
