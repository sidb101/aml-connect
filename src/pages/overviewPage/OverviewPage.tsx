import { type Params, redirect, useParams } from "react-router-dom";
import { dataSetupRoute } from "../../routes";
import OverviewView from "./layouts/OverviewView";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import remoteService from "../../service/RemoteService/RemoteService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { projectsActions, selectCurrentProject } from "../../redux/slices/ProjectsSlice";
import appStore from "../../redux/store";
import { useEffect } from "react";
import type { ProjectFormT } from "../../components/projectForm/ProjectForm";

const OverviewPage = () => {
	const { projectSlug = "" } = useParams();
	const dispatch = useAppDispatch();
	const currentProject = useAppSelector(selectCurrentProject);

	useEffect(() => {
		dispatch(projectsActions.openProject(projectSlug));
	}, [projectSlug]);

	return (
		currentProject && (
			<>
				<Header headerTitle={`${currentProject.name} > Overview`} />
				<OverviewView currentProject={currentProject} />
				<Footer
					footerBtnGroup={{ nextBtn: { label: "Data Hub", route: dataSetupRoute(currentProject.slug) } }}
				/>
			</>
		)
	);
};

/**
 * Action for when a project's details are updated.
 * @param request The post request when the update project form is submitted.
 * @param params Contains the project slug of the project to be updated.
 */
export async function overviewPageAction({ request, params }: { request: Request; params: Params }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as ProjectFormT;

	const projectSlug = params.projectSlug!;

	const updatedProject = await remoteService.updateProject(projectSlug, data.projectName, data.projectDescription);

	appStore.dispatch(projectsActions.updateProject(updatedProject));

	return redirect(`/project/${updatedProject.slug}/overview`);
}

export default OverviewPage;
