import { combineReducers, configureStore, type PreloadedState } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { generalReducer } from "./slices/GeneralSlice";
import { dataHubReducer } from "./slices/DataHubSlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
	general: generalReducer,
	dataHub: dataHubReducer,
});

/** To set up store from a preloaded state, to facilitate testing with various
    values in the store. In actual codebase, the preloaded state would be empty, thus
 default store would be created.

 * @param preloadedState: The state you want to populate in the store when the application starts
 */
export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: rootReducer,
		preloadedState,
	});

export const appStore = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
