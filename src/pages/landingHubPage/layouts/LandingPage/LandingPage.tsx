import LandingView from "./layouts/LandingView";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/setupStore";

type LandingPageProps = {
	data?: string;
};

const LandingPage = (props: LandingPageProps) => {
	const projects = useSelector((store: RootState) => store.projects.allProjects);

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
