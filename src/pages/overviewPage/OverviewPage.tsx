import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { type Params, redirect, useNavigate, useParams } from "react-router-dom";
import {
	projectActions,
	ProjectStatus,
	selectAllProjects,
	selectCurrentProjectDescription,
	selectCurrentProjectName,
	selectCurrentProjectStatus,
	selectIsProjectOpen,
} from "../../redux/slices/ProjectSlice";
import { dataSetupRoute } from "../../routes";
import OverviewView from "./layouts/OverviewView";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import remoteService from "../../service/RemoteService/RemoteService";
import { appStore } from "../../redux/store";
import type { ProjectFormT } from "../../components/projectForm/ProjectForm";
import View from "../../components/view/View";

export type OverviewT = {
	data?: string;
	isNewProject?: boolean;
};

const OverviewPage = ({ isNewProject = false, ...props }: OverviewT) => {
	const navigate = useNavigate();
	const { projectSlug = "" } = useParams();
	const dispatch = useAppDispatch();
	const allProjects = useAppSelector(selectAllProjects);
	const currentProjectStatus = useAppSelector(selectCurrentProjectStatus);
	const currentProjectName = useAppSelector(selectCurrentProjectName);
	const currentProjectDescription = useAppSelector(selectCurrentProjectDescription);
	const isProjectOpen = useAppSelector(selectIsProjectOpen);

	useEffect(() => {
		if (allProjects.length > 0) {
			dispatch(projectActions.openProject(projectSlug));
		}
	}, [allProjects.length, projectSlug]);

	useEffect(() => {
		if (currentProjectStatus === ProjectStatus.ERROR) {
			navigate("/error-page", { replace: true });
		}
	}, [currentProjectStatus]);

	return (
		isProjectOpen && (
			<View
				header={<Header headerTitle={`${currentProjectName} > Overview`} />}
				main={
					<OverviewView
						currentProjectName={currentProjectName}
						currentProjectDescription={currentProjectDescription}
					/>
				}
				footer={
					<Footer footerBtnGroup={{ nextBtn: { label: "Data Hub", route: dataSetupRoute(projectSlug) } }} />
				}
			/>
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
