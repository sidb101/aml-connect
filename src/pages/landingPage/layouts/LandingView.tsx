import { LandingPageHeader } from "./components/LandingPageHeader";
import { ExampleProject } from "./components/ExampleProject";
import React from "react";
import "./LandingView.scss";
import Header from "../../../components/header/Header";

export type LandingPageViewT = {
	data?: string;
};

const LandingView = (props: LandingPageViewT) => {
	return (
		<>
			<Header headerTitle={"Projects"} element={<LandingPageHeader />} />
			<div className={`body-content-container-no-footer`}>
				<div className={`main-content-container`}>
					<div className={`LandingPageView_gridContainer`}>
						<div className={`LandingPageView_gridRow1`}>
							<ExampleProject projectName="Example Project: Dog Bark Detection" />
							<ExampleProject projectName="Glass Break Detection" />
							<ExampleProject projectName="Glass Break Detection" />
						</div>
						<div className={`LandingPageView_gridRow2`}>
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
						</div>
						<div className={`LandingPageView_gridRow3`}>
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
						</div>
						<div className={`LandingPageView_gridRow4`}>
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
						</div>
						<div className={`LandingPageView_gridRow5`}>
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingView;
