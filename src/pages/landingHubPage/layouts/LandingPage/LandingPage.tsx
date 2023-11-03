import { useAppDispatch, useAppSelector } from "../../../../hooks";
import type { Params } from "react-router-dom";
import { redirect } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";
import type { DisplayCardFormT } from "../../../../components/displayCard/DisplayCard";
import LandingView from "./layouts/LandingView";
import { projectActions, selectAllProjects } from "../../../../redux/slices/ProjectSlice";
import remoteService from "../../../../service/RemoteService/RemoteService";
import { appStore } from "../../../../redux/store";
import { useEffect } from "react";

function LandingPage() {
	const projects = useAppSelector(selectAllProjects);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(projectActions.closeProject());
	}, []);

	return <LandingView projects={projects} />;
}

export async function landingPageAction({ request, params }: { request: Request; params: Params }) {
	if (request.method === "DELETE") {
		const formData = await request.formData();
		const data = Object.fromEntries(formData) as DisplayCardFormT;

		await remoteService.deleteProject(data.projectSlug);

		appStore.dispatch(projectActions.deleteProject(data.projectSlug));
	}

	return redirect(BASE_ROUTE);
}

export default LandingPage;
