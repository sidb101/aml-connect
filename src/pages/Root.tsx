import { Outlet, useLocation } from "react-router-dom";
import { NavRegion } from "../components/sideBar/navRegion/NavRegion";
import { Suspense, useEffect, useState } from "react";
import type { SideRegionT } from "../components/sideBar/sideRegion/SideRegion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { projectActions, ProjectStatus, selectCurrentProjectName } from "../redux/slices/ProjectSlice";
import { getOpenProjectNavLinks } from "../components/sideBar/navRegion/appNavLinks";
import "./Root.scss";
import type { NavLinkT } from "../components/sideBar/navRegion/navLink/NavLink";
import { isNavLinkSelected } from "../components/sideBar/navRegion/navLink/NavLink";
import Spinner from "../components/spinner/Spinner";
import Sidebar from "../components/sideBar/Sidebar";
import { generalActions, selectLoading } from "../redux/slices/GeneralSlice";
import ProjectsRegion from "../components/sideBar/projectRegion/ProjectsRegion";
import remoteService from "../service/RemoteService/RemoteService";
import { mockProjects } from "../tests/mockdata/allProjectsMock";

function Root() {
	const [openProjectNavLinks, setOpenProjectNavLinks] = useState<NavLinkT[]>([]);

	const { pathname } = useLocation();

	const dispatch = useAppDispatch();

	// getting the required data from the state
	const { projectStatus, projectSlug, allProjects } = useAppSelector((state) => state.project);
	const projectName = useAppSelector(selectCurrentProjectName);
	const isLoading = useAppSelector(selectLoading);

	useEffect(() => {
		// get all the projects of the application and set them in the state
		fetchAllProjects().catch((e) => {
			console.error("Couldn't fetch all projects..", e);
		});
		// dispatch(projectActions.setAllProjects(mockProjects));
	}, []);

	//get the proper links based on given project
	useEffect(() => {
		setOpenProjectNavLinks(getOpenProjectNavLinks(projectSlug));
	}, [projectSlug]);

	const fetchAllProjects = async () => {
		console.log("fetching projects");
		dispatch(generalActions.markLoading(true));
		const allProjects = await remoteService.getAllProjects();
		dispatch(projectActions.setAllProjects(allProjects));
		dispatch(generalActions.markLoading(false));
	};

	const getSideRegion = (): SideRegionT => {
		if (projectStatus === ProjectStatus.OPEN) {
			return {
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
			<div className={"xlight-panel content-container"}>
				{/*Suspense is used by React Router when loading a page or getting data using its loader*/}
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}

export default Root;
