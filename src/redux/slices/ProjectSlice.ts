/**
 * This slice would deal with all the basic project related parts of the state, which are
 * mostly meta-data of the project
 * The slice would give different actions that can be dispatched to update the
 * given project state
 */

export type ProjectT = {
	slug: string;
	name: string;
	description?: string;
};

const initialState: ProjectT = {
	slug: "",
	name: "",
};
