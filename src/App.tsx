import "./App.scss";
import { Sidebar } from "./components/sidebar/Sidebar";
import React from "react";
import { NavRegion } from "./components/navRegion/NavRegion";
import openProjectsSections from "./components/navRegion/mockData/openedProject";

const App = () => (
	<div className={"App_container"}>
		<Sidebar
			logo="AnalogML Connect"
			sideRegion={[
				// {
				//     heading: 'Projects',
				//     region: <ProjectsRegion projects={allProjects} />
				// },
				// {
				//     heading: 'Project',
				//     region: <NavRegion navSections={newProjectSection} />
				// },
				{
					heading: "Project",
					region: <NavRegion navSections={openProjectsSections} />,
				},
			]}
		/>
		<div className={"xlight-panel content-container App_Content"}></div>
	</div>
);

export default App;
