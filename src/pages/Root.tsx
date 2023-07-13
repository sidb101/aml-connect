import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/sideBar/Sidebar";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import { ProjectsRegion } from "../components/sideBar/projectRegion/ProjectsRegion";
import { mockProjects } from "../tests/mockdata/allProjects";
import React, { useEffect } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { generalActions, selectCurrentProjectName, ProjectStatus } from "../redux/slices/GeneralSlice";
import { getOpenProjectNavLinks } from "../components/sideBar/navRegion/appNavLinks";
import { testIds } from "../tests/test-utils";

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
	const projectName = useAppSelector(selectCurrentProjectName);

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
			<div className={"xlight-panel content-container Root_content"} data-testid={testIds.contentHeading}>
				<Outlet />
			</div>
		</>
	);
};

export default Root;
