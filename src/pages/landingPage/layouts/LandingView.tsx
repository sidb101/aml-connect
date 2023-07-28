import { LandingPageHeader } from "./components/LandingPageHeader";
import { ExampleProject } from "./components/ExampleProject";
import React from "react";
import "./LandingView.scss";
import Header from "../../../components/header/Header";
import ProjectCard from "./components/ProjectCard";

export type LandingPageViewT = {
	data?: string;
};

const LandingView = (props: LandingPageViewT) => {
	return (
		<>
			<Header headerTitle={"Projects"} element={<LandingPageHeader />} />
			<div className={`body-content-container-no-footer`}>
				<div className={`main-content-container`}>
					<div className={`LandingView_container`}>
						<div className={`LandingView_containerRow`}>
							<ProjectCard />
							<ProjectCard />
						</div>
						<div className={`LandingView_containerRow`}>
							<ProjectCard />
							<ProjectCard />
						</div>
						<div className={`LandingView_containerRow`}>
							<ProjectCard />
							<ProjectCard />
						</div>
						<div className={`LandingView_containerRow`}>
							<ExampleProject projectName="Glass Break Detection" />
							<ExampleProject projectName="Glass Break Detection" />
						</div>
						{/*<ExampleProject projectName="Glass Break Detection" />*/}
					</div>
					{/*	<div className={`LandingPageView_gridContainer`}>*/}
					{/*		<div className={`LandingPageView_gridRow1`}>*/}
					{/*			<ProjectCard />*/}
					{/*			<ExampleProject projectName="Example Project: Dog Bark Detection" />*/}
					{/*			<ExampleProject projectName="Glass Break Detection" />*/}
					{/*			<ExampleProject projectName="Glass Break Detection" />*/}
					{/*		</div>*/}
					{/*		<div className={`LandingPageView_gridRow2`}>*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*		</div>*/}
					{/*		<div className={`LandingPageView_gridRow3`}>*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*		</div>*/}
					{/*		<div className={`LandingPageView_gridRow4`}>*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*		</div>*/}
					{/*		<div className={`LandingPageView_gridRow5`}>*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*			<ExampleProject projectName="Alexa Voice" />*/}
					{/*		</div>*/}
					{/*	</div>*/}
				</div>
			</div>
		</>
	);
};

export default LandingView;
