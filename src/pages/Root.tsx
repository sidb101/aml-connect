import { Outlet, useLocation } from "react-router-dom";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import React, { Suspense, useEffect, useState } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { projectsActions, ProjectStatus, selectProjects } from "../redux/slices/ProjectsSlice";
import { testIds } from "../tests/test-utils";
import "./Root.scss";
import type { NavLinkT } from "../components/sideBar/navRegion/navLink/NavLink";
import { isNavLinkSelected } from "../components/sideBar/navRegion/navLink/NavLink";
import Spinner from "../components/spinner/Spinner";
import Sidebar from "../components/sideBar/Sidebar";
import ProjectsRegion from "../components/sideBar/projectRegion/ProjectsRegion";
import { getOpenProjectNavLinks } from "../components/sideBar/navRegion/appNavLinks";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectIsLoading } from "../redux/slices/GeneralSlice";

function Root() {
	const [openProjectNavLinks, setOpenProjectNavLinks] = useState<NavLinkT[]>([]);

	const { projectStatus, currentProject, allProjects } = useAppSelector(selectProjects);
	const isLoading = useAppSelector(selectIsLoading);

	const dispatch = useAppDispatch();

	useEffect(() => {
		// get all the projects of the application and set them in the state
		dispatch(projectsActions.setAllProjects());
	}, []);

	useEffect(() => {
		if (currentProject) {
			setOpenProjectNavLinks(getOpenProjectNavLinks(currentProject.slug));
		}
	}, [currentProject]);

	const { pathname } = useLocation();

	const getSideRegion = (): SideRegionT => {
		if (projectStatus === ProjectStatus.OPEN) {
			return {
				heading: "Project",
				region: (
					<NavRegion
						heading={currentProject?.name || "Undefined Project"}
						navLinks={openProjectNavLinks.map((navLink) => ({
							...navLink,
							// setting the selected attribute for the appropriate link
							isSelected: isNavLinkSelected(navLink, pathname),
						}))}
					/>
				),
			};
		}

		if (projectStatus === ProjectStatus.NEW) {
			return {
				heading: "Project",
				region: <NavRegion heading={"New Project"} />,
			};
		}

		if (projectStatus === ProjectStatus.NOT_OPEN) {
			return {
				heading: "Projects",
				region: <ProjectsRegion projects={allProjects} />,
			};
		}

		throw new Error("Unknown project status.");
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
}

export default Root;
