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
import { dataHubActions } from "../../../../redux/slices/DataHubSlice";
import { modelCreationActions } from "../../../../redux/slices/ModelCreationSlice";
import { resultActions } from "../../../../redux/slices/ResultSlice";

function LandingPage() {
	const projects = useAppSelector(selectAllProjects);

	const dispatch = useAppDispatch();

	//Close any opened project and flush the state so that new project can load its own data when visited
	useEffect(() => {
		dispatch(projectActions.closeProject());
		dispatch(dataHubActions.resetState());
		dispatch(modelCreationActions.resetState());
		dispatch(resultActions.resetState());
	}, []);

	return <LandingView projects={projects} />;
}

/**
 * React Browser Router action to handle requests. Currently, this is used when
 * a user wishes to delete a project.
 * @param request The request.
 */
export async function landingPageAction({ request }: { request: Request }) {
	if (request.method === "DELETE") {
		const formData = await request.formData();
		const data = Object.fromEntries(formData) as DisplayCardFormT;

		const projectToDeleteId = parseInt(data.projectId, 10);

		await remoteService.deleteProject(projectToDeleteId);

		appStore.dispatch(projectActions.deleteProject(projectToDeleteId));
	}

	return redirect(BASE_ROUTE);
}

export default LandingPage;
