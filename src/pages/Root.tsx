import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/sideBar/Sidebar";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import { ProjectsRegion } from "../components/sideBar/projectRegion/ProjectsRegion";
import { mockProjects } from "../components/sideBar/projectRegion/mockData/allProjects";
import React, { useEffect } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { generalActions, getProjectName, ProjectStatus } from "../redux/slices/GeneralSlice";
import { getOpenProjectNavLinks } from "../components/sideBar/navRegion/appNavLinks";

export type RootT = {
	data?: string;
};

export type RootOutletContextT = {
	setProjectStatus: React.Dispatch<React.SetStateAction<ProjectStatus>>;
};

const Root = (props: RootT) => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

	// getting the required data from the state
	const { projectStatus, projectSlug, allProjects } = useAppSelector((state) => state.general);
	const projectName = useAppSelector(getProjectName);

	useEffect(() => {
		// get all the projects of the application and set them in the state
		dispatch(generalActions.setAllProjects(mockProjects));
	}, []);

	const getSideRegion = (): SideRegionT =>
		projectStatus === ProjectStatus.OPEN
			? {
					heading: "Project",
					region: (
						<NavRegion
							heading={projectName || "Undefined Project"}
							navLinks={getOpenProjectNavLinks(projectSlug).map((navLink) => ({
								...navLink,
								// setting the selected attribute for the appropriate link
								isSelected: navLink.route === pathname,
							}))}
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
				<Outlet />
			</div>
		</>
	);
};

export default Root;
