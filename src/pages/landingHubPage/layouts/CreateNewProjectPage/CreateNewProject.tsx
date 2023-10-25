import { redirect, useNavigation } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";
import ProjectForm from "../../../../components/projectForm/ProjectForm";
import Header from "../../../../components/header/Header";
import { type ProjectDetails } from "../../../../service/RemoteService/client/bindings/ProjectDetails";

function CreateNewProject() {
	return (
		<>
			<Header headerTitle={`New Project > Create New Project`} />
			<div className={`body-content-container-with-header-btns-no-footer`}>
				<div className={`main-content-container`}>
					<ProjectForm heading={`Create New Project`} />
				</div>
			</div>
		</>
	);
}

type CreateNewProjectFormT = {
	name: string;
	description: string;
};

export async function createNewProjectAction({ request }: { request: Request }) {
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

export default CreateNewProject;
