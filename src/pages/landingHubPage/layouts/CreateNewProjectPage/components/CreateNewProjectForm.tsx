import "./CreateNewProjectForm.scss";
import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { BASE_ROUTE } from "../../../../../routes";
import DisplayPanel from "../../../../../components/displayPanel/DisplayPanel";
import type { ProjectDetails } from "../../../../../service/RemoteService/client/bindings/ProjectDetails";

function CreateNewProjectForm() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<DisplayPanel heading={`Create New Project`}>
			<Form method="POST">
				<div className={`CreateNewProjectForm_container`}>
					<div className={`CreateNewProjectForm_formElementContainer`}>
						<label className={`green-text section-heading-text`}>Project Name</label>
						<input
							type="text"
							name="projectName"
							required
							className={`regular-text light-grey-text light-grey-panel`}
						/>
					</div>

					<div className={`CreateNewProjectForm_formElementContainer`}>
						<label className={`green-text section-heading-text`}>Project Description</label>
						<textarea
							name="projectDescription"
							className={`regular-text light-grey-text light-grey-panel`}
						/>
					</div>

					<button disabled={isSubmitting} className={`btn btn-solid`}>
						{isSubmitting ? "Creating new project..." : "Create Project"}
					</button>
				</div>
			</Form>
		</DisplayPanel>
	);
}

type CreateNewProjectFormT = {
	name: string;
	description: string;
};

export async function createNewProjectFormAction({ request }: { request: Request }) {
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

export default CreateNewProjectForm;
