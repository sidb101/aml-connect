import "./NewProjectPopup.scss";

export const NewProjectPopup = () => {
	return (
		<div className={`NewProjectPopup_container`}>
			<div className={`section-subheading-text grey-text NewProjectPopup_heading`}>FROM ASPINITY</div>
			<div className={`NewProjectPopup_newProjectContainer`}>
				<div className={`regular-text NewProjectPopup_newProjectContainer_internal`}>Glass Break Detection</div>
				<div className={`green-text NewProjectPopup_newProjectContainer_internal`}>
					Based on conversation with Glen Clark Aug 2022
				</div>
			</div>
			<div className={`section-subheading-text grey-text NewProjectPopup_heading`}>OR</div>
			<button className={`btn NewProjectPopup_button regular-text`}>Create from scratch</button>
		</div>
	);
};
