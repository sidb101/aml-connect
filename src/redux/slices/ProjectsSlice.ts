/**
 * This slice would deal with the projects state.
 */

import { type AnyAction, createSlice, current, type PayloadAction, type ThunkAction } from "@reduxjs/toolkit";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";
import remoteService from "../../service/RemoteService/RemoteService";
import type { RootState } from "../store";

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
		 * @param action The action with the project slug just opened.
		 */
		openProject: (state, action: PayloadAction<string>) => {
			state.projectStatus = ProjectStatus.OPEN;
			state.currentProject = state.allProjects.find((project) => project.slug === action.payload);
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

		/**
		 * To update the state when the user is creating a new project.
		 * @param state Projects state.
		 */
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

		updateProject: (state, action: PayloadAction<ProjectDetails>) => {
			// TODO: Delete this one backend is implemented (don't need to set the ID once backend working)
			const updatedProject: ProjectDetails = {
				...action.payload,
				id: state.currentProject?.id || action.payload.id,
			};
			state.currentProject = updatedProject;

			// TODO: Only need the below once backend is implemented
			//state.currentProject = action.payload;
			state.allProjects = state.allProjects.map((project) => {
				return project.slug === action.payload.slug ? action.payload : project;
			});
		},

		deleteProject: (state, action: PayloadAction<string>) => {
			state.allProjects = state.allProjects.filter((project) => project.slug !== action.payload);
		},
	},
});

function setAllProjects(): ThunkAction<void, RootState, unknown, AnyAction> {
	return async function (dispatch, getState) {
		// Check if projects have already been fetched by inspecting the state
		const currentState: ProjectsState = getState().projects;

		// If projects haven't already been loaded
		if (currentState.allProjects.length === 0) {
			// Backend call
			const projects = await remoteService.getProjects();

			dispatch({
				type: "projects/setAllProjects",
				payload: projects,
			});
		}
	};
}

const {
	actions: { setAllProjects: _, ...restActions },
} = projectsSlice;

const exportActions = { ...restActions, setAllProjects };

export const projectsActions = exportActions;

export default projectsSlice.reducer;
