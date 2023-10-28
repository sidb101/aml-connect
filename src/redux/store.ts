import { combineReducers, configureStore, type PreloadedState } from "@reduxjs/toolkit";
import generalReducer from "./slices/GeneralSlice";
import projectsReducer from "./slices/ProjectsSlice";
import dataHubReducer from "./slices/DataHubSlice";
import thunk from "redux-thunk";

// Create the root reducer separately, so we can extract the RootState type
const rootReducer = combineReducers({
	general: generalReducer,
	projects: projectsReducer,
	dataHub: dataHubReducer,
});

/**
 * NOTE: The setupStore must be exported so test cases can load it with a preloaded state.
 *
 * To set up store from a preloaded state, to facilitate testing with various
 values in the store. In actual codebase, the preloaded state would be empty, thus
 default store would be created.

 * @param preloadedState The state you want to populate in the store when the application starts
 */
export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
	});

const appStore = setupStore();
export default appStore;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
