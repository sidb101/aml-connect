import React from "react";
import "./ProjectName.scss";

function ProjectName() {
	return (
		<>
			<div className={`green-text section-subheading-text`}>Project Name</div>
			<input className={`regular-text light-grey-text ProjectName_input`} value={"Glass Break Detection"} />
		</>
	);
}

export default ProjectName;
