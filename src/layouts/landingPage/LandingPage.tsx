import { Header } from "./components/Header";
import React from "react";
import { ExampleProject } from "./components/ExampleProject";
import "./LandingPage.scss";

export const LandingPage = () => {
	return (
		<>
			<div className={`header-content-container`}>
				<Header />
			</div>
			<div className={`body-content-container`}>
				<div className={`main-content-container`}>
					{/* <div> */}
					{/*	Testsadklajasdffffffffffffffffffffffffffffffffffffffffasdfsadfsajasdjhkgjkhfdjhkgfjkhldgfgfdhbdgfsbgdfjkhlgsdjhklsdajhdgajhklgjhkdgfjdgfgfdlfsssssssssssssssssssssssssssssssssssssss|tttt */}
					{/* </div> */}
					<div className={`LandingPage_gridContainer`}>
						<div className={`LandingPage_gridRow1`}>
							<ExampleProject projectName="Example Project: Dog Bark Detection" />
							<ExampleProject projectName="Glass Break Detection" />
						</div>
						<div className={`LandingPage_gridRow2`}>
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
						</div>
						<div className={`LandingPage_gridRow3`}>
							<ExampleProject projectName="Alexa Voice" />
							<ExampleProject projectName="Alexa Voice" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
