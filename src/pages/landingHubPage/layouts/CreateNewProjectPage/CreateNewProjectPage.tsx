import { redirect } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";
import { type ProjectDetails } from "../../../../service/RemoteService/client/bindings/ProjectDetails";
import CreateNewProjectView from "./layouts/CreateNewProjectView";
import remoteService from "../../../../service/RemoteService/RemoteService";

function CreateNewProjectPage() {
	return <CreateNewProjectView />;
}

type CreateNewProjectFormT = {
	name: string;
	description: string;
};

export async function createNewProjectPageAction({ request }: { request: Request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as CreateNewProjectFormT;

	console.log(data);

	const projectsWithNewProject = await remoteService.createProject(data.name, data.description);

	const newProject = projectsWithNewProject[projectsWithNewProject.length - 1];

	return redirect(`/project/${newProject.slug}/overview`);
}

export default CreateNewProjectPage;
