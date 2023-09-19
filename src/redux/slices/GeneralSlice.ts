/**
 * This slice would deal with all the global parts of the state, that are used
 * throughout the application, across various slices.
 * The slice would give different actions that can be dispatched to update the
 * given general state
 */

import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AUDIO_DIR } from "../../constants";

type GeneralState = {
	projectStatus: ProjectStatus;
	projectSlug: string;
	allProjects: BasicProjectDataT[];
};

// Status of the app in terms of whether a project is opened,  closed, or new project to be created
export enum ProjectStatus {
	NEW, // When a new project is to be created
	OPEN, // When a project is already  opened
	NOT_OPEN, // When no project is open (mostly at the homepage of the app)
}

// Minimum project data to needed for all the projects for that application
export type BasicProjectDataT = {
	slug: string;
	name: string;
};

const initialState: GeneralState = {
	projectStatus: ProjectStatus.NOT_OPEN,
	projectSlug: "",
	allProjects: [],
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
		 * To set the status of application as project opened and with given slug
		 * @param state: General state
		 * @param action: The action have slug in the request
		 */
		openProject: (state, action: PayloadAction<string>) => {
			state.projectStatus = ProjectStatus.OPEN;
			state.projectSlug = action.payload;
		},

		/**
		 * To declare to app to update status to align with new project state.
		 * @param state: General state
		 */
		newProject: (state) => {
			state.projectStatus = ProjectStatus.NEW;
		},

		/**
		 * To declare to app to update status to align with a closed state.
		 * @param state: General state
		 */
		closeProject: (state) => {
			state.projectStatus = ProjectStatus.NOT_OPEN;
		},

		/**
		 * To update state with the data of all the projects to be loaded for
		 * that application
		 * @param state: General state
		 * @param action: Array of ProjectData objects having basic project data for each project
		 */
		setAllProjects: (state, action: PayloadAction<BasicProjectDataT[]>) => {
			state.allProjects = action.payload;
		},
	},
});

/**
 * Different App Selectors
 */

/**
 * Gets the project name from the corresponding project slug using given project array
 * @return ProjectName if the slug is present in the state, else null
 * @param state: the Root app state
 */
export const selectCurrentProjectName = createSelector(
	(state: RootState) => state.general,
	({ allProjects, projectSlug }) => {
		const project = allProjects.find((project) => project.slug === projectSlug);
		return project ? project.name : undefined;
	}
);

export const selectCurrentProjectSlug = createSelector(
	(state: RootState) => state.general,
	({ projectSlug }) => projectSlug
);

export const selectCurrentProjectAudioDir = createSelector(
	(state: RootState) => state.general,
	({ projectSlug }) => `${projectSlug}/${AUDIO_DIR}`
);

export const { name: generalSliceKey, reducer: generalReducer, actions: generalActions } = generalSlice;
