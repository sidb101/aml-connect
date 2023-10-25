import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { redirect, useLocation, useParams } from "react-router-dom";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import { BASE_ROUTE, dataSetupRoute, NEW_PROJECT_ROUTE } from "../../routes";
import OverviewView from "./layouts/OverviewView";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";

export type OverviewT = {
	data?: string;
	isNewProject?: boolean;
};

const OverviewPage = ({ isNewProject = false, ...props }: OverviewT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const { pathname } = useLocation();

	const reduxProjectName = useAppSelector(selectCurrentProjectName) || "";
	const [currentProjectName, setCurrentProjectName] = useState<string>(reduxProjectName);
	const [currentProjectDescription, setCurrentProjectDescription] = useState<string>("");

	function handleProjectNameOnChange(newProjectName: string): void {
		setCurrentProjectName(newProjectName);
	}

	useEffect(() => {
		pathname === NEW_PROJECT_ROUTE
			? dispatch(generalActions.newProject())
			: projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("Not a new-project, as well as projectSlug not present in the URL.");
	}, [projectSlug, pathname]);

	// This effect will set currentProjectName to reduxProjectName whenever reduxProjectName changes
	useEffect(() => {
		setCurrentProjectName(reduxProjectName);
	}, [reduxProjectName]);

	return (
		projectSlug && (
			<>
				<Header headerTitle={`${currentProjectName} > Overview`} />
				<OverviewView
					currentProjectName={currentProjectName}
					onProjectTitleChange={handleProjectNameOnChange}
					currentProjectDescription={currentProjectDescription}
				/>
				<Footer footerBtnGroup={{ nextBtn: { label: "Data Hub", route: dataSetupRoute(projectSlug) } }} />
			</>
		)
	);
};

type UpdateProjectFormT = {
	name: string;
	description: string;
};

export async function overviewPageAction({ request }: { request: Request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as UpdateProjectFormT;

	console.log(data);

	const project: ProjectDetails = {
		id: 0,
		slug: "update-dummy-project",
		name: data.name,
		description: data.description,
	};

	//const updatedProject = await updateProjectDetails(project);

	//return redirect(`/project/${updatedProject.slug}/overview`);
	return redirect(`${BASE_ROUTE}`);
}

export default OverviewPage;
