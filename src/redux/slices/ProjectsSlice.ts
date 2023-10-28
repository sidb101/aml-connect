/**
 * This slice would deal with the projects state.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";

// Status of the app in terms of whether a project is opened,  closed, or new project to be created
export enum ProjectStatus {
	NEW, // When a new project is to be created
	OPEN, // When a project is already  opened
	NOT_OPEN, // When no project is open (mostly at the homepage of the app)
}

type ProjectsState = {
	projectStatus: ProjectStatus;
	currentProject: ProjectDetails | undefined;
	allProjects: ProjectDetails[];
};

const initialState: ProjectsState = {
	projectStatus: ProjectStatus.NOT_OPEN,
	currentProject: undefined,
	allProjects: [],
};

/**
 * The slice of the state that would define all the actions and reducers for this state
 */
const projectsSlice = createSlice({
	name: "projects",
	initialState, // the type of this slice of the state would be inferred from the type of initial state
	reducers: {
		// the keys of this object would also become the actions for this slice

		/**
		 * To set the current project to the project that was opened.
		 * @param state Projects state.
		 * @param action The action with the project just opened in it.
		 */
		openProject: (state, action: PayloadAction<ProjectDetails>) => {
			state.projectStatus = ProjectStatus.OPEN;
			state.currentProject = action.payload;
		},

		/**
		 * To set the current project back to undefined once it has been closed.
		 * @param state Projects state.
		 */
		closeProject: (state) => {
			state.projectStatus = ProjectStatus.NOT_OPEN;
			state.currentProject = undefined;
		},

		/**
		 * To update state with the data of all the projects to be loaded for
		 * the application.
		 * @param state Projects state.
		 * @param action Array of ProjectDetails objects containing the project data for each project.
		 */
		setAllProjects: (state, action: PayloadAction<ProjectDetails[]>) => {
			state.allProjects = action.payload;
		},

		newProject: (state) => {
			state.projectStatus = ProjectStatus.NEW;
		},

		/**
		 * Adds a new project to the state.
		 * @param state Projects state.
		 * @param action The action with the new project details in it.
		 */
		addNewProject: (state, action: PayloadAction<ProjectDetails>) => {
			state.allProjects.push(action.payload);
		},
	},
});

export const { actions: projectsActions } = projectsSlice;

export default projectsSlice.reducer;
