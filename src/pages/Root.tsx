import { Outlet, useLocation, useMatches } from "react-router-dom";
import { Sidebar } from "../components/sideBar/Sidebar";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import { ProjectsRegion } from "../components/sideBar/projectRegion/ProjectsRegion";
import { mockProjects } from "../tests/mockdata/allProjects";
import React, { useEffect } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { generalActions, ProjectStatus, selectCurrentProjectName } from "../redux/slices/GeneralSlice";
import { getOpenProjectNavLinks } from "../components/sideBar/navRegion/appNavLinks";
import { testIds } from "../tests/test-utils";
import "./Root.scss";
import { isNavLinkSelected } from "../components/sideBar/navRegion/navLink/NavLink";

export type RootT = {
	data?: string;
};

export type RootOutletContextT = {
	setProjectStatus: React.Dispatch<React.SetStateAction<ProjectStatus>>;
};

const Root = (props: RootT) => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const matches = useMatches();
	console.log(matches);

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
								isSelected: isNavLinkSelected(pathname, navLink),
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
		<div className={`Root_container`}>
			<div className={`Root_sidebarContainer`}>
				<Sidebar logo="AnalogML Connect" sideRegion={[getSideRegion()]} />
			</div>
			<div className={"xlight-panel content-container"} data-testid={testIds.contentHeading}>
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
