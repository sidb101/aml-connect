import React from "react";
import "./ProjectDescription.scss";

const dummyText =
	"We are developing a smart device for in-home surveillance. This device would " +
	"detect the sounds of glass break to help trigger a security alert within our " +
	"system.\n\n" +
	"Our goal is create a model that can detect the sound of glass break with " +
	"90% accuracy.\n\n" +
	"This model would be deployed in devices that would ideally live " +
	"indoor environments with various distances from potential sources of glass " +
	"environments (windows, doors, etc).";

function ProjectDescription() {
	return (
		<>
			<div className={`green-text section-subheading-text`}>Project Description</div>
			<textarea
				className={`regular-text light-grey-text ProjectDescription_container`}
				value={dummyText}
			></textarea>
		</>
	);
}

export default ProjectDescription;
