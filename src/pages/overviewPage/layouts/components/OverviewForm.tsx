import "./OverviewForm.scss";
import React, { useEffect, useState } from "react";
import FormInput from "../../../../components/formInput/FormInput";
import FormTextArea from "../../../../components/formTextArea/FormTextArea";

type OverviewFormProps = {
	currentProjectName: string;
	onProjectTitleChange: (newProjectName: string) => void;
	currentProjectDescription: string;
};

export default function OverviewForm({
	currentProjectName,
	onProjectTitleChange,
	currentProjectDescription,
}: OverviewFormProps) {
	const [projectName, setProjectName] = useState<string>(currentProjectName);
	const [projectDescription, setProjectDescription] = useState<string>(currentProjectDescription);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault(); // Prevent the page from reloading on submit
	}

	useEffect(() => {
		setProjectName(currentProjectName);
	}, [currentProjectName]);

	useEffect(() => {
		setProjectDescription(currentProjectDescription);
	}, [currentProjectDescription]);

	return (
		<form className={`OverviewForm_container`} onSubmit={handleSubmit}>
			<div className={`OverviewForm_internalContainer`}>
				<div className={`OverviewForm_internalContainerColumn`}>
					<div className={`OverviewForm_internalContainerColumnContent`}>
						<FormInput heading={`Project Name`} value={projectName} onChange={setProjectName} />
					</div>
				</div>
				<div className={`OverviewForm_internalContainerColumn`}>
					<div className={`OverviewForm_internalContainerColumnContent`}>
						<FormTextArea
							heading={`Project Description`}
							value={projectDescription}
							onChange={setProjectDescription}
						/>
					</div>
				</div>
			</div>
			<div className={`OverviewForm_saveBtnContainer`}>
				<button className={`btn btn-outline`}>Save</button>
			</div>
		</form>
	);
}
