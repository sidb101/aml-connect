import "./OverviewForm.scss";
import React, { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

const dummyText =
	"e.g. We are developing a smart device for in-home surveillance. This device would " +
	"detect the sounds of glass break to help trigger a security alert within our " +
	"system.\n\n" +
	"Our goal is create a model that can detect the sound of glass break with " +
	"90% accuracy.\n\n" +
	"This model would be deployed in devices that would ideally live " +
	"indoor environments with various distances from potential sources of glass " +
	"environments (windows, doors, etc).";

type OverviewFormProps = {
	projectName: string;
	onProjectTitleChange: (newProjectName: string) => void;
};

export default function OverviewForm({ projectName, onProjectTitleChange }: OverviewFormProps) {
	const [name, setName] = useState<string>(projectName);
	const [description, setDescription] = useState<string>("");

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault(); // Prevent the page from reloading on submit
		onProjectTitleChange(name);
	}

	// This effect will set name to projectName whenever projectName changes
	useEffect(() => {
		setName(projectName);
	}, [projectName]);

	return (
		<form className={`OverviewForm_container`} onSubmit={handleSubmit}>
			<div className={`OverviewForm_internalContainer`}>
				<div className={`OverviewForm_internalContainerColumn`}>
					<div className={`OverviewForm_internalContainerColumnContent`}>
						<div className={`green-text section-heading-text`}>Project Name</div>
						<input
							className={`regular-text light-grey-text light-grey-panel`}
							value={name}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setName(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className={`OverviewForm_internalContainerColumn`}>
					<div className={`OverviewForm_internalContainerColumnContent`}>
						<div className={`green-text section-heading-text`}>Project Description</div>
						<textarea
							className={`regular-text light-grey-text light-grey-panel`}
							placeholder={dummyText}
							value={description}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
								setDescription(e.target.value);
							}}
						></textarea>
					</div>
				</div>
			</div>
			<div className={`OverviewForm_saveBtnContainer`}>
				<button className={`btn btn-outline`}>Save</button>
			</div>
		</form>
	);
}
