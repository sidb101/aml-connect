import { type Params, redirect, useLoaderData } from "react-router-dom";
import { BASE_ROUTE, dataSetupRoute } from "../../routes";
import OverviewView from "./layouts/OverviewView";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";
import { mockProjects } from "../../tests/mockdata/allProjects";
import remoteService from "../../service/RemoteService/RemoteService";

const OverviewPage = () => {
	const currentProject = useLoaderData() as ProjectDetails;

	return (
		currentProject && (
			<>
				<Header headerTitle={`${currentProject.name} > Overview`} />
				<OverviewView currentProjectName={currentProject.name} />
				<Footer
					footerBtnGroup={{ nextBtn: { label: "Data Hub", route: dataSetupRoute(currentProject.slug) } }}
				/>
			</>
		)
	);
};

export async function overviewPageLoader({ params }: { params: Params }): Promise<ProjectDetails> {
	const projectSlug = params.projectSlug as string;
	//const currentProject = await remoteService.getProject(projectSlug);
	const currentProject = mockProjects[0];
	return currentProject;
}

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
