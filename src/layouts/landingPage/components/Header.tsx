import "./Header.scss";
import { CreateNewProjectPopup } from "./CreateNewProjectPopup";
import { useState } from "react";

export const Header = () => {
	const [isSelected, setIsSelected] = useState(false);

	const expandPopup = () => {
		setIsSelected(!isSelected);
	};

	return (
		<>
			<div className={`Header_container`}>
				<div className={`Header_gridContainer`}>
					<div className={`Header_gridRow1`}>
						<div className={`main-heading-text`}>Projects</div>
					</div>
					<div className={`Header_gridRow2`}>
						{isSelected ? (
							<div
								className={`Header_backDrop`}
								onClick={() => {
									expandPopup();
								}}
							></div>
						) : null}
						<div className={`Header_popupContainer`}>
							<button
								className={`btn ${isSelected ? `btn-solid` : `btn-outline`}`}
								onClick={() => {
									expandPopup();
								}}
							>
								Create New Project +
							</button>
						</div>
					</div>
					<div className={`Header_gridRow3`}>
						<div className={`Header_popupContainer`}>{isSelected ? <CreateNewProjectPopup /> : null}</div>
					</div>
				</div>
			</div>
		</>
	);
};
