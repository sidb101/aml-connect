import "./LandingPageHeader.scss";
import { NewProjectPopup } from "./NewProjectPopup";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

export const LandingPageHeader = () => {
	const [isSelected, setIsSelected] = useState(false);

	const togglePopup = () => {
		setIsSelected(!isSelected);
	};

	return (
		<>
			<div className={`LandingPageHeader_gridContainer`}>
				<div className={`LandingPageHeader_gridRow1`}>
					<div className={`main-heading-text`}>Projects</div>
				</div>
				<div className={`LandingPageHeader_gridRow2`}>
					{isSelected && (
						<div
							className={`LandingPageHeader_backDrop`}
							onClick={() => {
								togglePopup();
							}}
						></div>
					)}
					<div className={`LandingPageHeader_popupContainer`}>
						<button
							className={`btn ${isSelected ? `btn-solid` : `btn-outline`}`}
							onClick={() => {
								togglePopup();
							}}
						>
							Create New Project <FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</div>
				<div className={`LandingPageHeader_gridRow3`}>
					<div className={`LandingPageHeader_popupContainer`}>{isSelected && <NewProjectPopup />}</div>
				</div>
			</div>
		</>
	);
};
