import { redirect } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";
import CreateNewProjectView from "./layouts/CreateNewProjectView";
import remoteService from "../../../../service/RemoteService/RemoteService";
import { projectsActions } from "../../../../redux/slices/ProjectsSlice";
import { mockProjects } from "../../../../tests/mockdata/allProjects";
import type { ProjectFormT } from "../../../../components/projectForm/ProjectForm";
import { useAppDispatch } from "../../../../hooks";
import appStore from "../../../../redux/store";

function CreateNewProjectPage() {
	const dispatch = useAppDispatch();
	dispatch(projectsActions.newProject());

	return <CreateNewProjectView />;
}

export async function createNewProjectPageAction({ request }: { request: Request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as ProjectFormT;

	const newProject = await remoteService.createProject(
		mockProjects.length, // TODO: Not required when the backend is implemented
		data.projectName,
		data.projectDescription
	);

	appStore.dispatch(projectsActions.addNewProject(newProject));

	return redirect(BASE_ROUTE);
}

export default CreateNewProjectPage;
