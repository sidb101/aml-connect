import { redirect } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";
import { useAppDispatch } from "../../../../hooks";
import remoteService from "../../../../service/RemoteService/RemoteService";
import { mockProjects } from "../../../../tests/mockdata/allProjectsMock";
import { appStore } from "../../../../redux/store";
import type { ProjectFormT } from "../../../../components/projectForm/ProjectForm";
import CreateNewProjectView from "./layouts/CreateNewProjectView";
import { projectActions } from "../../../../redux/slices/ProjectSlice";
import { useEffect } from "react";

function CreateNewProjectPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(projectActions.newProject());
	}, []);

	return <CreateNewProjectView />;
}

/**
 * React Browser Router action to handle requests. Currently, this is used when
 * a user wishes to create a new project.
 * @param request The request.
 */
export async function createNewProjectPageAction({ request }: { request: Request }) {
	if (request.method === "POST") {
		const formData = await request.formData();
		const data = Object.fromEntries(formData) as ProjectFormT;

		const newProject = await remoteService.createProject(data.projectName, data.projectDescription);

		appStore.dispatch(projectActions.addNewProject(newProject));
	}

	return redirect(BASE_ROUTE);
}

export default CreateNewProjectPage;
