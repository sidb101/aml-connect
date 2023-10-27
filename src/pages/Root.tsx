import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import React, { Suspense, useEffect, useState } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { projectsActions, ProjectStatus } from "../redux/slices/ProjectsSlice";
import { testIds } from "../tests/test-utils";
import "./Root.scss";
import type { NavLinkT } from "../components/sideBar/navRegion/navLink/NavLink";
import { isNavLinkSelected } from "../components/sideBar/navRegion/navLink/NavLink";
import Spinner from "../components/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/setupStore";
import type { ProjectDetails } from "../service/RemoteService/client/bindings/ProjectDetails";
import remoteService from "../service/RemoteService/RemoteService";
import Sidebar from "../components/sideBar/Sidebar";
import ProjectsRegion from "../components/sideBar/projectRegion/ProjectsRegion";
import { getOpenProjectNavLinks } from "../components/sideBar/navRegion/appNavLinks";

function Root() {
	const [openProjectNavLinks, setOpenProjectNavLinks] = useState<NavLinkT[]>([]);

	const dispatch = useDispatch();
	const { projectStatus, currentProject, allProjects } = useSelector((store: RootState) => store.projects);
	const isLoading = useSelector((store: RootState) => store.general.isLoading);

	const projects = useLoaderData() as ProjectDetails[];

	useEffect(() => {
		dispatch(projectsActions.setAllProjects(projects));
	}, [projects]);

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
				<Sidebar logo="AnalogML Connect" sideRegion={[getSideRegion()]} />
			</div>
			<div className={"xlight-panel content-container"} data-testid={testIds.contentHeading}>
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}

export async function rootLoader(): Promise<ProjectDetails[]> {
	const projects = await remoteService.getProjects();
	return projects;
}

export default Root;
