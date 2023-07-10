import "./ExampleProject.scss";
import type React from "react";

type ExampleProjectT = {
	projectName: string;
};

export const ExampleProject: React.FC<ExampleProjectT> = (props) => {
	return (
		<div className={`ExampleProject_container`}>
			<div className={`white-panel  ExampleProject_projectPanel`}>
				<div className="section-heading-text">{props.projectName}</div>
				<br />
				<div className="section-subheading-text"> Created By: ChipMonks</div>
				<div className="section-subheading-text green-text"> Section Blue Subheading</div>
				<div className="section-subheading-text grey-text"> Section Grey Subheading</div>
				<br />
				<div className="regular-text"> This is regular text.</div>
				<div className="regular-text grey-text"> This is regular grey text.</div>
				<div className="regular-text light-grey-text">
					An AnalogML model that detects the sound of dog bark for deployment in the outdoor context. It is
					trained on a near and far field dataset of dog barks of common American dog breeds. It employs 4
					analog features and uses a 2-layer neural network.
				</div>
				<div className="small-text light-grey-text"> This is small light-grey text.</div>
				<div className="xsmall-text light-grey-text"> This is xsmall light-grey text.</div>
				<br />
				<button className="btn btn-outline">
					Open Project &nbsp;&nbsp;
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="arrow-right"
						className="svg-inline--fa fa-arrow-right "
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							fill="currentColor"
							d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
						></path>
					</svg>
				</button>
			</div>
		</div>
	);
};
