import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { generalActions, ProjectStatus } from "../../../../redux/slices/GeneralSlice";
import LandingView from "./layouts/LandingView";
import { type ProjectDetails } from "../../../../service/RemoteService/client/bindings/ProjectDetails";
import remoteService from "../../../../service/RemoteService/RemoteService";
import { projectCards } from "../../../../tests/mockdata/allProjectCards";
import { useLoaderData } from "react-router-dom";

type LandingPageProps = {
	data?: string;
};

const LandingPage = (props: LandingPageProps) => {
	const projects = useLoaderData() as ProjectDetails[];

	const dispatch = useAppDispatch();
	const projectStatus = useAppSelector((state) => state.general.projectStatus);

	useEffect(() => {
		// dispatch action only if the status is NOT_OPEN
		projectStatus !== ProjectStatus.NOT_OPEN && dispatch(generalActions.closeProject());
	}, [projectStatus]);

	return <LandingView projects={projects} />;
};

type DeleteProjectT = {
	slug: string;
};

export async function landingPageAction({ request }: { request: Request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as DeleteProjectT;

	console.log(data);
}

export async function landingPageLoader(): Promise<ProjectDetails[]> {
	return await remoteService.getProjects();
}

export default LandingPage;
