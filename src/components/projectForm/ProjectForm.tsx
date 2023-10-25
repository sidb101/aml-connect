import "./ProjectForm.scss";
import React from "react";
import { Form, useNavigation } from "react-router-dom";
import DisplayPanel from "../displayPanel/DisplayPanel";

type ProjectFormProps = {
	heading: string;
};

function ProjectForm({ heading }: ProjectFormProps) {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<DisplayPanel heading={`${heading}`}>
			<Form method="POST">
				<div className={`ProjectForm_container`}>
					<div className={`ProjectForm_grid`}>
						<div className={`ProjectForm_formElementContainer`}>
							<label className={`green-text section-heading-text`}>Project Name</label>
							<input
								type="text"
								name="projectName"
								required
								className={`regular-text light-grey-text light-grey-panel`}
							/>
						</div>

						<div className={`ProjectForm_formElementContainer`}>
							<label className={`green-text section-heading-text`}>Project Description</label>
							<textarea
								name="projectDescription"
								className={`regular-text light-grey-text light-grey-panel`}
							/>
						</div>
					</div>

					<button disabled={isSubmitting} className={`btn btn-solid`}>
						{isSubmitting ? "Creating new project..." : "Create Project"}
					</button>
				</div>
			</Form>
		</DisplayPanel>
	);
}

export default ProjectForm;
