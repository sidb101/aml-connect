import React from "react";
import "./ProjectName.scss";

type ProjectNameProps = {
	projectName: string;
	onProjectTitleChange: (newProjectName: string) => void;
};

function ProjectName({ projectName, onProjectTitleChange }: ProjectNameProps) {
	return (
		<>
			<div className={`green-text section-subheading-text`}>Project Name</div>
			<input
				className={`regular-text light-grey-text ProjectName_input`}
				value={projectName}
				onChange={(e) => {
					onProjectTitleChange(e.target.value);
				}}
			/>
		</>
	);
}

export default ProjectName;
