import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Sidebar } from "../components/sideBar/Sidebar";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import { ProjectsRegion } from "../components/sideBar/projectRegion/ProjectsRegion";
import { allProjects } from "../components/sideBar/projectRegion/mockData/allProjects";
import React, { useEffect, useState } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { DATA_HUB_ROUTE, MODEL_CREATION_ROUTE, OVERVIEW_ROUTE, RESULTS_ROUTE, SEND_TO_HARDWARE_ROUTE } from "../routes";

export type RootT = {
	data?: string;
};

export enum ProjectStatus {
	NOT_OPENED,
	NEW,
	OPENED,
}

export type RootOutletContextT = {
	setProjectStatus: React.Dispatch<React.SetStateAction<ProjectStatus>>;
};

const Root = (props: RootT) => {
	// TODO: Transfer everything to Redux states
	const [projectStatus, setProjectStatus] = useState<ProjectStatus>(ProjectStatus.NOT_OPENED);
	const [projectNames, setProjectNames] = useState<string[]>([]);
	// TODO: The opened project Index would be decided on the basis of the project slug in the url
	const [openedProjectIndex, setOpenedProjectIndex] = useState<number>(0);

	const location = useLocation();

	useEffect(() => {
		// Get all the project names and set them in the state
		setProjectNames(allProjects);
	}, []);

	const getOpenedProject = (): string => {
		// Valid state
		if (openedProjectIndex >= 0 && openedProjectIndex < projectNames.length) {
			return projectNames[openedProjectIndex];
		}

		return "Undefined Project";
	};

	const getSideRegion = (): SideRegionT =>
		projectStatus === ProjectStatus.OPENED
			? {
					heading: "Project",
					region: (
						<NavRegion
							heading={getOpenedProject()}
							navLinks={[
								{
									label: "Overview",
									isSelected: location.pathname === OVERVIEW_ROUTE,
									route: OVERVIEW_ROUTE,
								},
								{
									label: "Data Hub",
									isSelected: location.pathname === DATA_HUB_ROUTE,
									route: DATA_HUB_ROUTE,
								},
								{
									label: "Model Creation",
									isSelected: location.pathname === MODEL_CREATION_ROUTE,
									route: MODEL_CREATION_ROUTE,
								},
								{
									label: "Results",
									isSelected: location.pathname === RESULTS_ROUTE,
									route: RESULTS_ROUTE,
								},
								{
									label: "Send to Hardware",
									isSelected: location.pathname === SEND_TO_HARDWARE_ROUTE,
									route: SEND_TO_HARDWARE_ROUTE,
								},
							]}
						/>
					),
			  }
			: projectStatus === ProjectStatus.NEW
			? {
					heading: "Project",
					region: <NavRegion heading={"New Project"} />,
			  }
			: {
					heading: "Projects",
					region: <ProjectsRegion projects={allProjects} />,
			  };

	return (
		<>
			<Sidebar logo="AnalogML Connect" sideRegion={[getSideRegion()]} />
			<div className={"xlight-panel content-container Root_content"}>
				<Outlet context={{ setProjectStatus } satisfies RootOutletContextT} />
			</div>
		</>
	);
};

/**
 * Hook to send the Root component's data to the outlets in form of
 * its context. For eg: Method to set the Project status.
 */
export function useRootOutletContext() {
	return useOutletContext<RootOutletContextT>();
}

export default Root;
