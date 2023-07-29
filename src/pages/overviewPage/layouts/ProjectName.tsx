import "./ProjectName.scss";
import type { ChangeEvent } from "react";

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
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					onProjectTitleChange(e.target.value);
				}}
			/>
		</>
	);
}

export default ProjectName;
