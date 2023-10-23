import { Outlet, useLocation, useMatches } from "react-router-dom";
import { Sidebar } from "../components/sideBar/Sidebar";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import { ProjectsRegion } from "../components/sideBar/projectRegion/ProjectsRegion";
import { mockProjects } from "../tests/mockdata/allProjects";
import React, { Suspense, useEffect, useState } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { generalActions, ProjectStatus, selectCurrentProjectName, selectLoading } from "../redux/slices/GeneralSlice";
import { getOpenProjectNavLinks } from "../components/sideBar/navRegion/appNavLinks";
import { testIds } from "../tests/test-utils";
import "./Root.scss";
import type { NavLinkT } from "../components/sideBar/navRegion/navLink/NavLink";
import { isNavLinkSelected } from "../components/sideBar/navRegion/navLink/NavLink";
import Spinner from "../components/spinner/Spinner";

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
	const isLoading = useAppSelector(selectLoading);

	const [openProjectNavLinks, setOpenProjectNavLinks] = useState<NavLinkT[]>([]);

	useEffect(() => {
		// get all the projects of the application and set them in the state
		dispatch(generalActions.setAllProjects(mockProjects));
	}, []);

	//get the proper links based on given project
	useEffect(() => {
		setOpenProjectNavLinks(getOpenProjectNavLinks(projectSlug));
	}, [projectSlug]);

	const getSideRegion = (): SideRegionT =>
		projectStatus === ProjectStatus.OPEN
			? {
					heading: "Project",
					region: (
						<NavRegion
							heading={projectName || "Undefined Project"}
							navLinks={openProjectNavLinks.map((navLink) => ({
								...navLink,
								// setting the selected attribute for the appropriate link
								isSelected: isNavLinkSelected(navLink, pathname),
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
			{isLoading && <Spinner />}
			<div className={`Root_sidebarContainer`}>
				<Sidebar logo="AnalogML Connect" sideRegion={[getSideRegion()]} />
			</div>
			<div className={"xlight-panel content-container"} data-testid={testIds.contentHeading}>
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
};

export default Root;
