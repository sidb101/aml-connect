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
						{!isSelected ?
							<button
								className={`btn btn-solid`}
								onClick={() => expandPopup()}
							>
								Create New Project +
							</button>
							:
							<>
								<div className={`LandingPageHeader_backDrop`}></div>
								<button
									className={`btn btn-solid LandingPageHeader_openPopupButton`}
									onClick={() => expandPopup()}
								>
									Create New Project +
								</button>
								<div>
									<div className={`LandingPageHeader_popup`}>
										<CreateNewProjectPopup />
									</div>
								</div>
							</>
						}
					</div>
				</div>
			</div>
			<hr/>
		</>
	);
};