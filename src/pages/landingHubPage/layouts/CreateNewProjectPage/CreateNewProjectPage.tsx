import { redirect } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";
import { type ProjectDetails } from "../../../../service/RemoteService/client/bindings/ProjectDetails";
import CreateNewProjectView from "./layouts/CreateNewProjectView";

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

	const project: ProjectDetails = {
		id: 0,
		slug: "new-dummy-project",
		name: data.name,
		description: data.description,
	};

	//const newProject = await createNewProject(project);

	//return redirect(`/project/${newProject.slug}/overview`);
	return redirect(`${BASE_ROUTE}`);
}

export default CreateNewProjectPage;
