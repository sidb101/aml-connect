import "./App.scss";
import React from "react";
import { NavRegion } from "./components/navRegion/NavRegion";
import openProjectsSections from "./components/navRegion/mockData/openedProject";
import { Sidebar } from "./components/sideBar/Sidebar";
import { LandingPage } from "./layouts/landingPage/LandingPage";

const App = () => (
	<div className={"App_container"}>
		<Sidebar
			logo="AnalogML Connect"
			sideRegion={[
				/** Various states of the Navbar. Uncomment the one that you want to choose  **/

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
		<div className={"xlight-panel content-container"}>
			<LandingPage />
		</div>
	</div>
);

export default App;
