import React, { useState } from "react";
import "./ProjectName.scss";

function ProjectName() {
	const [projectName, setProjectName] = useState<string>("");

	return (
		<>
			<div className={`green-text section-subheading-text`}>Project Name</div>
			<input
				className={`regular-text light-grey-text ProjectName_input`}
				placeholder={"e.g. Glass Break Detection"}
				value={projectName}
				onChange={(e) => setProjectName(e.target.value)}
			/>
		</>
	);
}

export default ProjectName;
