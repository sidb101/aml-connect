import "./ProjectForm.scss";
import React from "react";
import { Form, useNavigation } from "react-router-dom";
import DisplayPanel from "../displayPanel/DisplayPanel";
import { testIds } from "../../tests/test-utils";

export type ProjectFormT = {
	projectName: string;
	projectDescription: string;
};

type ProjectFormProps = {
	heading: string;
	projectNamePlaceholder?: string;
	projectDescriptionPlaceholder?: string;
	buttonText: {
		isSubmitting: string;
		notSubmitting: string;
	};
};

const descriptionPlaceholder =
	"Enter the project description here.\n\n\nFor example:\n\n\tWe are developing a ...\n\tfor ...\n\n\tThis device would ...\n\tto ...\n\n\tOur goal is ...";

function ProjectForm({
	heading,
	projectNamePlaceholder = "Enter the project name here.",
	projectDescriptionPlaceholder = descriptionPlaceholder,
	buttonText,
}: ProjectFormProps) {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<DisplayPanel heading={`${heading}`}>
			<Form method="POST" className={`ProjectForm_container`}>
				<div className={`ProjectForm_grid`}>
					<div className={`ProjectForm_formElementContainer`}>
						<label className={`green-text section-heading-text`} htmlFor="projectName">
							Project Name
						</label>
						<input
							type="text"
							name="projectName"
							placeholder={projectNamePlaceholder}
							required
							className={`regular-text light-grey-text light-grey-panel`}
							data-testid={testIds.projectNameInput}
						/>
					</div>

					<div className={`ProjectForm_formElementContainer`}>
						<label className={`green-text section-heading-text`} htmlFor="projectDescription">
							Project Description
						</label>
						<textarea
							name="projectDescription"
							placeholder={projectDescriptionPlaceholder}
							className={`regular-text light-grey-text light-grey-panel`}
							data-testid={testIds.projectDescriptionInput}
						/>
					</div>
				</div>

				<div className={`ProjectForm_btn`}>
					<button
						disabled={isSubmitting}
						className={`btn btn-outline`}
						data-testid={testIds.projectFormSubmitBtn}
					>
						{isSubmitting ? buttonText.isSubmitting : buttonText.notSubmitting}
					</button>
				</div>
			</Form>
		</DisplayPanel>
	);
}

export default ProjectForm;
