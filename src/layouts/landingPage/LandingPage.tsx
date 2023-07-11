import { Header } from "./components/Header";
import "./LandingPage.scss";
import { ExampleProject } from "./components/ExampleProject";
import { NavRegion } from "../../components/navRegion/NavRegion";
import openProjectsSections from "../../components/navRegion/mockData/openedProject";
import { Sidebar } from "../../components/sideBar/Sidebar";
import React from "react";

export const LandingPage = () => {
	return (
		<>
			<div className={`header-content-container`}>
				<Header />
			</div>
			<div className={`main-content-container`}>
				<p>
					Lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng
				</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>

				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				{/*<ExampleProject projectName="Example Project: Dog Bark Detection" />*/}
				{/*<ExampleProject projectName="Glass Break Detection" />*/}
				{/*<ExampleProject projectName="Alexa Voice" />*/}
			</div>
		</>
	);
};
