import { type Params, redirect, useLoaderData } from "react-router-dom";
import { BASE_ROUTE, dataSetupRoute } from "../../routes";
import OverviewView from "./layouts/OverviewView";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";
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
	const currentProject = await remoteService.getProject(projectSlug);
	return currentProject;
}

type UpdateProjectFormT = {
	name: string;
	description: string;
};

export async function overviewPageAction({ request, params }: { request: Request; params: Params }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as UpdateProjectFormT;
	console.log(data);

	const projectSlug = params.projectSlug as string;
	console.log(projectSlug);

	const updatedProject = await remoteService.updateProject(projectSlug, data.name, data.description);

	//return redirect(`/project/${updatedProject.slug}/overview`);
	return redirect(`${BASE_ROUTE}`);
}

export default OverviewPage;
