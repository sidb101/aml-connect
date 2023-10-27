import { LandingPageHeader } from "./components/LandingPageHeader";
import "./LandingView.scss";
import Header from "../../../../../components/header/Header";
import DisplayCard, { type DisplayCardT } from "../../../../../components/displayCard/DisplayCard";
import type { ProjectDetails } from "../../../../../service/RemoteService/client/bindings/ProjectDetails";
import { projectOverviewRoute } from "../../../../../routes";
import { projectsActions } from "../../../../../redux/slices/ProjectsSlice";
import { useDispatch } from "react-redux";

type LandingPageViewProps = {
	projects?: ProjectDetails[];
};

const LandingView = ({ projects }: LandingPageViewProps) => {
	const dispatch = useDispatch();

	const handleOpenProject = (project: ProjectDetails) => {
		dispatch(projectsActions.openProject(project));
	};

	return (
		<>
			<Header headerTitle={"Projects"}>{<LandingPageHeader />}</Header>
			<div className={`body-content-container-with-header-btns-no-footer`}>
				<div className={`LandingView_container`}>
					{projects?.map((project: ProjectDetails) => {
						const displayCard: DisplayCardT = {
							title: project.name,
							labels: ["AnalogML Connect"],
							description: project.description || "",
							buttonText: "Open Project",
							route: projectOverviewRoute(project.slug),
							showCross: true,
							onClick: () => {
								handleOpenProject(project);
							},
						};

						return <DisplayCard key={project.id} displayCard={displayCard} />;
					})}
				</div>
			</div>
		</>
	);
};

export default LandingView;
