import "./LandingPageHeader.scss";
import {useState} from "react";
import {CreateNewProjectPopup} from "./CreateNewProjectPopup";

export const LandingPageHeader = () => {
	const [isSelected, setIsSelected] = useState(false);

	const expandPopup = () => {
		setIsSelected(!isSelected);
	};

	return (
		<>
			<div className={`LandingPageHeader_container`}>
				<div className={`LandingPageHeader_topLeft`}>
					<div className={`main-heading-text`}>
						Projects
					</div>
				</div>
				<div className={`LandingPageHeader_bottomRight`}>
					<div className={`LandingPageHeader_verticalContainer`}>
						<button
							className={`btn btn-outline`}
							onClick={() => expandPopup()}
						>
							Create New Project +
						</button>
						{isSelected ?
							<CreateNewProjectPopup/>
							:
							null
						}
					</div>
				</div>
			</div>
			<hr/>
		</>
	);
};