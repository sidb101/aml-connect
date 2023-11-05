import "./TwoOptionForm.scss";
import { Form } from "react-router-dom";
import React, { useEffect, useRef } from "react";

type TwoOptionFormProps = {
	title: string;
	onNoClick: () => void;
	projectSlug: string;
};

function TwoOptionForm({ title, onNoClick, projectSlug }: TwoOptionFormProps) {
	const noButtonRef = useRef<HTMLButtonElement>(null);

	// Set focus on the No button when the component mounts
	useEffect(() => {
		noButtonRef.current?.focus();
	}, []);

	const stopClickPropagation = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	return (
		<div className="TwoOptionForm_container" onClick={stopClickPropagation}>
			<div className="white-panel TwoOptionForm_innerContainer">
				<div className="section-heading-text">{title}</div>
				<div className="TwoOptionForm_buttonContainer">
					<button ref={noButtonRef} className="btn btn-solid" onClick={onNoClick}>
						No
					</button>{" "}
					<Form method="DELETE">
						<input type="hidden" name="projectSlug" value={projectSlug} />
						<button className="btn btn-outline">Yes</button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default TwoOptionForm;
