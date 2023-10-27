import { redirect } from "react-router-dom";
import { BASE_ROUTE, dataSetupRoute } from "../../routes";
import OverviewView from "./layouts/OverviewView";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/setupStore";
import { useEffect } from "react";

export type OverviewT = {
	data?: string;
	isNewProject?: boolean;
};

const OverviewPage = ({ isNewProject = false, ...props }: OverviewT) => {
	const currentProject = useSelector((store: RootState) => store.projects.currentProject);

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
