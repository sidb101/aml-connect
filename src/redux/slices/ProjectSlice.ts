/**
 * This slice would deal with all the project aspects of the state.
 * The slice would give different actions that can be dispatched to update the
 * given project state
 */

import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AUDIO_DIR } from "../../constants";

export type ShallowProjectDetails = {
	id: number;
	slug: string;
	name: string;
	description?: string;
};

type ProjectState = {
	projectStatus: ProjectStatus;
	projectSlug: string;
	projectName: string;
	projectDescription?: string;
	allProjects: ShallowProjectDetails[];
};

// Status of the app in terms of whether a project is opened,  closed, or new project to be created
export enum ProjectStatus {
	NEW, // When a new project is to be created
	OPEN, // When a project is already  opened
	NOT_OPEN, // When no project is open (mostly at the homepage of the app)
}

const initialState: ProjectState = {
	projectStatus: ProjectStatus.NOT_OPEN,
	projectSlug: "",
	projectName: "",
	allProjects: [],
};

/**
 * The slice of the state that would define all the actions and reducers for this state
 */
export const projectSlice = createSlice({
	name: "project",
	initialState, // the type of this slice of the state would be inferred from the type of initial state
	reducers: {
		// the keys of this object would also become the actions for this slice

		/**
		 * To set the status of application as project opened and with given slug
		 * @param state: General state
		 * @param action: The action have slug in the request
		 */
		openProject: (state, action: PayloadAction<string>) => {
			if (state.projectStatus !== ProjectStatus.OPEN) {
				const projectToOpen = state.allProjects.find((project) => project.slug === action.payload);

				if (projectToOpen) {
					state.projectStatus = ProjectStatus.OPEN;
					state.projectSlug = action.payload;
					state.projectName = projectToOpen.name;
					state.projectDescription = projectToOpen.description;
				} else {
					console.error(`Project with slug: ${action.payload} does not exist.`);
					state.projectStatus = ProjectStatus.NOT_OPEN;
				}
			}
		},

		/**
		 * To declare to app to update status to align with new project state.
		 * @param state: General state
		 */
		newProject: (state) => {
			state.projectStatus = ProjectStatus.NEW;
		},

		/**
		 * Adds a new project to the state.
		 * @param state General state.
		 * @param action The action with the new project details in it.
		 */
		addNewProject: (state, action: PayloadAction<ShallowProjectDetails>) => {
			state.allProjects.push(action.payload);
		},

		/**
		 * To declare to app to update status to align with a closed state.
		 * @param state: General state
		 */
		closeProject: (state) => {
			state.projectStatus = ProjectStatus.NOT_OPEN;
			state.projectSlug = "";
			state.projectName = "";
			state.projectDescription = undefined;
		},

		/**
		 * To update state with the data of all the projects to be loaded for
		 * that application
		 * @param state: General state
		 * @param action: Array of ProjectData objects having basic project data for each project
		 */
		setAllProjects: (state, action: PayloadAction<ShallowProjectDetails[]>) => {
			state.allProjects = action.payload;
		},

		updateProject: (state, action: PayloadAction<ShallowProjectDetails>) => {
			state.projectName = action.payload.name;
			state.projectDescription = action.payload.description;
			// TODO: Only need the below once backend is implemented
			state.allProjects = state.allProjects.map((project) => {
				return project.slug === action.payload.slug ? action.payload : project;
			});
		},

		deleteProject: (state, action: PayloadAction<string>) => {
			state.allProjects = state.allProjects.filter((project) => project.slug !== action.payload);
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
	(state: RootState) => state.project,
	({ projectName }) => projectName
);

export const selectCurrentProjectDescription = createSelector(
	(state: RootState) => state.project,
	({ projectDescription }) => projectDescription
);

export const selectCurrentProjectSlug = createSelector(
	(state: RootState) => state.project,
	({ projectSlug }) => projectSlug
);

export const selectCurrentAudioPath = createSelector(
	(state: RootState) => state.project,
	({ projectSlug }) => `${projectSlug}/${AUDIO_DIR}`
);

export const selectAllProjects = createSelector(
	(state: RootState) => state.project,
	({ allProjects }) => allProjects
);

export const selectIsProjectOpen = createSelector(
	(state: RootState) => state.project,
	({ projectStatus }) => projectStatus === ProjectStatus.OPEN
);

export const { name: projectSliceKey, reducer: projectReducer, actions: projectActions } = projectSlice;
