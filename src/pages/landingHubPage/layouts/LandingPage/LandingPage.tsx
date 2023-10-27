import LandingView from "./layouts/LandingView";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../redux/setupStore";
import { projectsActions } from "../../../../redux/slices/ProjectsSlice";

type LandingPageProps = {
	data?: string;
};

const LandingPage = (props: LandingPageProps) => {
	const projects = useSelector((store: RootState) => store.projects.allProjects);

	const dispatch = useDispatch();

	dispatch(projectsActions.closeProject());

	return <LandingView projects={projects} />;
};

type DeleteProjectT = {
	slug: string;
};

export async function landingPageAction({ request }: { request: Request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as DeleteProjectT;

	console.log(data);
}

export default LandingPage;
