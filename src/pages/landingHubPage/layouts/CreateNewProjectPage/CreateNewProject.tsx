import { Form, redirect, useNavigation } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";

function CreateNewProject() {
	//const navigation = useNavigation();
	//const isSubmitting = navigation.state === "submitting";
	const isSubmitting = false;

	return (
		<div className={`body-content-container-with-header-btns-no-footer`}>
			<div className={`main-content-container`}>
				<Form method="POST">
					<div>
						<label>Project Name</label>
						<input type="text" name="projectName" required />
					</div>

					<div>
						<label>Project Description</label>
						<input type="text" name="projectDescription" />
					</div>

					<button disabled={isSubmitting}>
						{isSubmitting ? "Creating new project..." : "Create Project"}
					</button>
				</Form>
			</div>
		</div>
	);
}

type CreateNewProjectOrderFormT = {
	name: string;
	description: string;
};

export async function createNewProjectAction({ request }: { request: Request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as CreateNewProjectOrderFormT;

	console.log(data);

	return redirect(`${BASE_ROUTE}`);
}

export default CreateNewProject;
