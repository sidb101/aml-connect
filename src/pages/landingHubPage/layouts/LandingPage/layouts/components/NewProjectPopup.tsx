import "./NewProjectPopup.scss";
import { Link } from "react-router-dom";

export const NewProjectPopup = () => {
	return (
		<div className={`white-panel NewProjectPopup_container`}>
			<div className={`section-subheading-text grey-text NewProjectPopup_heading`}>FROM ASPINITY</div>
			<button className={`btn btn-outline NewProjectPopup_btn`}>
				<div className={`regular-text`}>Select a template</div>
				<div className={`small-text green-text`}>
					Provided by Aspinity to help you get started with your project
				</div>
			</button>
			<div className={`section-subheading-text grey-text NewProjectPopup_heading`}>OR</div>
			<Link to={"/new"} className={`btn btn-outline NewProjectPopup_btn`}>
				<div className={`regular-text`}>Create from scratch</div>
			</Link>
		</div>
	);
};
