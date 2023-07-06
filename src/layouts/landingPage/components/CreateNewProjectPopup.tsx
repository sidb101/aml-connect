import "./CreateNewProjectPopup.scss";

export const CreateNewProjectPopup = () => {
	return (
		<div className={`CreateNewProjectPopup_container`}>
			<div className={`section-subheading-text grey-text CreateNewProjectPopup_heading`}>
				FROM ASPINITY
			</div>
			<div className={`CreateNewProjectPopup_newProjectContainer`}>
				<div className={`regular-text CreateNewProjectPopup_newProjectContainer_internal`}>
					Glass Break Detection
				</div>
				<div className={`green-text CreateNewProjectPopup_newProjectContainer_internal`}>
					Based on conversation with Glen Clark Aug 2022
				</div>
			</div>
			<div className={`section-subheading-text grey-text CreateNewProjectPopup_heading`}>
				OR
			</div>
			<button className={`btn CreateNewProjectPopup_button regular-text`}>
				Create from scratch
			</button>
		</div>
	);
};