import "./Header.scss";
import { CreateNewProjectPopup } from "./CreateNewProjectPopup";
import { useState } from "react";

export const Header = () => {
	const [isSelected, setIsSelected] = useState(false);

	const expandPopup = () => {
		setIsSelected(!isSelected);
	};

	return (
		<div className={`${isSelected ? `Header_container___isSelected` : `Header_container`}`}>
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
					<button
						className={`btn ${isSelected ? `btn-solid Header_button___isSelected` : `btn-outline`}`}
						onClick={() => {
							expandPopup();
						}}
					>
						Create New Project +
					</button>
					{isSelected ? (
						<div>
							<div className={`Header_popup___isSelected`}>
								<CreateNewProjectPopup />
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
