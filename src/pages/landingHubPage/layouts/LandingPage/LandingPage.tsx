import LandingView from "./layouts/LandingView";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { projectsActions } from "../../../../redux/slices/ProjectsSlice";
import { useAppDispatch } from "../../../../hooks";
import { type Params, redirect } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";
import remoteService from "../../../../service/RemoteService/RemoteService";
import appStore from "../../../../redux/store";
import type { DisplayCardFormT } from "../../../../components/displayCard/DisplayCard";

type LandingPageProps = {
	data?: string;
};

const LandingPage = (props: LandingPageProps) => {
	const projects = useSelector((store: RootState) => store.projects.allProjects);

	const dispatch = useAppDispatch();

	dispatch(projectsActions.closeProject());

	return <LandingView projects={projects} />;
};

export async function landingPageAction({ request, params }: { request: Request; params: Params }) {
	if (request.method === "DELETE") {
		const formData = await request.formData();
		const data = Object.fromEntries(formData) as DisplayCardFormT;

		await remoteService.deleteProject(data.projectSlug);

		appStore.dispatch(projectsActions.deleteProject(data.projectSlug));
	}

	return redirect(BASE_ROUTE);
}

export default LandingPage;
