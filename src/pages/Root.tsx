import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Sidebar } from "../components/sideBar/Sidebar";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import { ProjectsRegion } from "../components/sideBar/projectRegion/ProjectsRegion";
import React, { Suspense, useState } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { projectActions, ProjectStatus } from "../redux/slices/ProjectsSlice";
import { testIds } from "../tests/test-utils";
import "./Root.scss";
import type { NavLinkT } from "../components/sideBar/navRegion/navLink/NavLink";
import { isNavLinkSelected } from "../components/sideBar/navRegion/navLink/NavLink";
import Spinner from "../components/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { ProjectDetails } from "../service/RemoteService/client/bindings/ProjectDetails";
import remoteService from "../service/RemoteService/RemoteService";

export type RootT = {
	data?: string;
};

const Root = (props: RootT) => {
	const [openProjectNavLinks, setOpenProjectNavLinks] = useState<NavLinkT[]>([]);

	const dispatch = useDispatch();
	const { projectStatus, allProjects, isLoading } = useSelector((store: RootState) => store.projects);

	const projects = useLoaderData() as ProjectDetails[];
	dispatch(projectActions.setAllProjects(projects));

	const { pathname } = useLocation();

	const projectName = undefined;

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

export async function rootLoader(): Promise<ProjectDetails[]> {
	const projects = await remoteService.getProjects();
	return projects;
}

export default Root;
