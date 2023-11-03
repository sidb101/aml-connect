import { Outlet, useLocation } from "react-router-dom";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import { mockProjects } from "../tests/mockdata/allProjects";
import React, { Suspense, useEffect, useState } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { projectActions, ProjectStatus, selectCurrentProjectName } from "../redux/slices/ProjectSlice";
import { getOpenProjectNavLinks } from "../components/sideBar/navRegion/appNavLinks";
import { testIds } from "../tests/test-utils";
import "./Root.scss";
import type { NavLinkT } from "../components/sideBar/navRegion/navLink/NavLink";
import { isNavLinkSelected } from "../components/sideBar/navRegion/navLink/NavLink";
import Spinner from "../components/spinner/Spinner";
import ProjectsRegion from "../components/sideBar/projectRegion/ProjectsRegion";
import Sidebar from "../components/sideBar/Sidebar";
import { selectLoading } from "../redux/slices/GenralSlice";

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
	const { projectStatus, projectSlug, allProjects } = useAppSelector((state) => state.project);
	const projectName = useAppSelector(selectCurrentProjectName);
	const isLoading = useAppSelector(selectLoading);

	const [openProjectNavLinks, setOpenProjectNavLinks] = useState<NavLinkT[]>([]);

	useEffect(() => {
		// get all the projects of the application and set them in the state
		dispatch(projectActions.setAllProjects(mockProjects));
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
				<Sidebar logo="AnalogML Connect" sideRegions={[getSideRegion()]} />
			</div>
			<div className={"xlight-panel content-container"} data-testid={testIds.contentHeading}>
				{/*Suspense is used by React Router when loading a page or getting data using its loader*/}
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
};

export default Root;
