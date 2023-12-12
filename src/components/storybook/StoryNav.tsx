import "./StoryNav.scss";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StoryNav = () => (
	<div className={"dark-panel nav-container StoryNav_container"}>
		<div className={"brand-text"}>Analog ML Connect</div>
		<br />
		<br />
		<div className={"regular-text light-text"}>
			PROJECTS &nbsp; <FontAwesomeIcon icon={faArrowRight} />
		</div>
		<br />
		<div className={"regular-text white-text StoryNav_link"}>This is white Navbar text</div>
	</div>
);
