import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { type Params, redirect, useLocation, useParams } from "react-router-dom";
import {
	projectActions,
	selectCurrentProjectDescription,
	selectCurrentProjectName,
} from "../../redux/slices/ProjectSlice";
import { dataSetupRoute } from "../../routes";
import OverviewView from "./layouts/OverviewView";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import remoteService from "../../service/RemoteService/RemoteService";
import { appStore } from "../../redux/store";
import type { ProjectFormT } from "../../components/projectForm/ProjectForm";

export type OverviewT = {
	data?: string;
	isNewProject?: boolean;
};

const OverviewPage = ({ isNewProject = false, ...props }: OverviewT) => {
	const dispatch = useAppDispatch();
	const { projectSlug = "" } = useParams();
	const { pathname } = useLocation();
	const currentProjectName = useAppSelector(selectCurrentProjectName);
	const currentProjectDescription = useAppSelector(selectCurrentProjectDescription);

	useEffect(() => {
		dispatch(projectActions.openProject(projectSlug));
	}, [projectSlug]);

	return (
		projectSlug &&
		currentProjectName && (
			<>
				<Header headerTitle={`${currentProjectName} > Overview`} />
				<OverviewView
					currentProjectName={currentProjectName}
					currentProjectDescription={currentProjectDescription}
				/>
				<Footer footerBtnGroup={{ nextBtn: { label: "Data Hub", route: dataSetupRoute(projectSlug) } }} />
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

	appStore.dispatch(projectActions.updateProject(updatedProject));

	return redirect(`/project/${updatedProject.slug}/overview`);
}

export default OverviewPage;
