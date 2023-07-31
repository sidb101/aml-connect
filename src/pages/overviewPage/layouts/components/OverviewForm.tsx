import "./OverviewForm.scss";
import React, { useEffect, useState } from "react";
import OverviewInput from "./OverviewInput";
import OverviewTextArea from "./OverviewTextArea";

type OverviewFormProps = {
	currentProjectName: string;
	onProjectTitleChange: (newProjectName: string) => void;
};

export default function OverviewForm({ currentProjectName, onProjectTitleChange }: OverviewFormProps) {
	const [projectName, setProjectName] = useState<string>(currentProjectName);
	const [projectDescription, setProjectDescription] = useState<string>("");

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault(); // Prevent the page from reloading on submit
		onProjectTitleChange(projectName);
	}

	// This effect will set projectName to projectName whenever projectName changes
	useEffect(() => {
		setProjectName(currentProjectName);
	}, [currentProjectName]);

	return (
		<form className={`OverviewForm_container`} onSubmit={handleSubmit}>
			<div className={`OverviewForm_internalContainer`}>
				<div className={`OverviewForm_internalContainerColumn`}>
					<div className={`OverviewForm_internalContainerColumnContent`}>
						<OverviewInput heading={`Project Name`} value={projectName} onChange={setProjectName} />
					</div>
				</div>
				<div className={`OverviewForm_internalContainerColumn`}>
					<div className={`OverviewForm_internalContainerColumnContent`}>
						<OverviewTextArea
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
