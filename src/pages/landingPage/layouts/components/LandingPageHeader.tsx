import "./LandingPageHeader.scss";
import { NewProjectPopup } from "./NewProjectPopup";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

export const LandingPageHeader = () => {
	const [isSelected, setIsSelected] = useState(false);

	const togglePopup = () => {
		setIsSelected((s) => !s);
	};

	return (
		<>
			{isSelected && (
				<div
					className={`LandingPageHeader_backDrop`}
					onClick={() => {
						togglePopup();
					}}
				></div>
			)}
			<div className={`LandingPageHeader_gridContainer`}>
				<div className={`LandingPageHeader_gridRow1`}>
					<button
						className={`LandingPageHeader_inFrontOfBackDrop btn ${
							isSelected ? `btn-solid` : `btn-outline`
						}`}
						onClick={() => {
							togglePopup();
						}}
					>
						Create New Project &nbsp;
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
				<div className={`LandingPageHeader_gridRow2`}>
					<div className={`LandingPageHeader_inFrontOfBackDrop`}>{isSelected && <NewProjectPopup />}</div>
				</div>
			</div>
		</>
	);
};
