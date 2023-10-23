import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, ProjectStatus } from "../../redux/slices/GeneralSlice";
import LandingPageView from "./layouts/LandingView";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";
import { useLoaderData } from "react-router-dom";
import { projectCards } from "../../tests/mockdata/allProjectCards";
import remoteService from "../../service/RemoteService/RemoteService";

type LandingPageProps = {
	data?: string;
};

const LandingPage = (props: LandingPageProps) => {
	const projects: ProjectDetails[] = useLoaderData() as ProjectDetails[];

	const dispatch = useAppDispatch();
	const projectStatus = useAppSelector((state) => state.general.projectStatus);

	useEffect(() => {
		// dispatch action only if the status is NOT_OPEN
		projectStatus !== ProjectStatus.NOT_OPEN && dispatch(generalActions.closeProject());
	}, [projectStatus]);

	return <LandingPageView projects={projects} />;
};

export async function landingPageLoader(): Promise<ProjectDetails[]> {
	try {
		return await remoteService.getProjects();
	} catch (e) {
		console.error("Couldn't get the projects from the backend.", e);
		return Promise.resolve(projectCards);
	}

	// console.log("Before");
	// const projects = await remoteService.getProjects();
	// console.log("After");
	// return projects;
}

export default LandingPage;
