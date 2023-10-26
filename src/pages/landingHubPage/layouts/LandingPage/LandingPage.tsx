import { useEffect } from "react";
//import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { ProjectStatus } from "../../../../redux/slices/ProjectsSlice";
import LandingView from "./layouts/LandingView";
import { type ProjectDetails } from "../../../../service/RemoteService/client/bindings/ProjectDetails";
import remoteService from "../../../../service/RemoteService/RemoteService";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

type LandingPageProps = {
	data?: string;
};

const LandingPage = (props: LandingPageProps) => {
	const projects = useSelector((store: RootState) => store.projects.allProjects);

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

export default LandingPage;
