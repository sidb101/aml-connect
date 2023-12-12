import "./StoryContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

export const StoryContent = () => (
	<div className={"xlight-panel content-container StoryContent_container"}>
		<div className={"main-heading-text"}>Projects</div>
		<div className={"white-panel  StoryContent_projectPanel"}>
			<div className={"section-heading-text"}>Example Project: Dog Bark Detection</div>
			<br />
			<div className={"section-subheading-text"}> Created By: ChipMonks</div>
			<div className={"section-subheading-text green-text"}> Section Blue Subheading</div>
			<div className={"section-subheading-text grey-text"}> Section Grey Subheading</div>
			<br />
			<div className={"regular-text"}> This is regular text.</div>
			<div className={"regular-text grey-text"}> This is regular grey text.</div>
			<div className={"regular-text light-grey-text"}>
				{" "}
				An AnalogML model that detects the sound of dog bark for deployment in the outdoor context. It is
				trained on a near and far field dataset of dog barks of common American dog breeds. It employs 4 analog
				features and uses a 2-layer neural network.
			</div>
			<div className={"small-text light-grey-text"}> This is small light-grey text.</div>
			<div className={"xsmall-text light-grey-text"}> This is xsmall light-grey text.</div>
			<br />
			<button className={"btn btn-outline"}>
				Open Project &nbsp;&nbsp;
				<FontAwesomeIcon icon={faArrowRight} />
			</button>
		</div>
		<div className={"StoryContent_buttonContainer"}>
			<button className={"btn btn-solid"}>
				Sample Solid Button &nbsp;
				<FontAwesomeIcon icon={faArrowRight} />
			</button>
			<button className={"btn btn-outline"}>
				<FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Sample Outline Button
			</button>
		</div>
	</div>
);
