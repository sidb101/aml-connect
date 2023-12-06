import "./ProjectForm.scss";
import React, { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import DisplayPanel from "../displayPanel/DisplayPanel";
import { testIds } from "../../tests/test-utils";
import TextInput from "../formElements/textInput/TextInput";

export type ProjectFormT = {
	projectName: string;
	projectDescription?: string;
};

type ProjectFormProps = {
	heading: string;
	projectName?: string;
	projectDescription?: string;
	buttonText: {
		isSubmitting: string;
		notSubmitting: string;
	};
};

const descriptionPlaceholder =
	"Enter the project description here.\n\n\nFor example:\n\n\tWe are developing a ...\n\tfor ...\n\n\tThis device would ...\n\tto ...\n\n\tOur goal is ...";

function ProjectForm({ heading, projectName, projectDescription, buttonText }: ProjectFormProps) {
	const [name, setName] = useState<string>(projectName || "");
	const [description, setDescription] = useState<string | undefined>(projectDescription);

	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(event.target.value);
	};

	return (
		<DisplayPanel heading={`${heading}`}>
			<Form method="POST" className={`ProjectForm_container`}>
				<div className={`ProjectForm_grid`}>
					<div className={`ProjectForm_formElementContainer`}>
						<label className={`green-text section-heading-text`} htmlFor="projectName">
							Project Name
						</label>
						<TextInput
							type="text"
							name="projectName"
							placeholder="Enter the project name here."
							value={name}
							onChange={handleNameChange}
							required={true}
							className={`panel-padding`}
							data-testid={testIds.projectNameInput}
						/>
					</div>

					<div className={`ProjectForm_formElementContainer`}>
						<label className={`green-text section-heading-text`} htmlFor="projectDescription">
							Project Description
						</label>
						<textarea
							name="projectDescription"
							placeholder={descriptionPlaceholder}
							value={description}
							onChange={handleDescriptionChange}
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
