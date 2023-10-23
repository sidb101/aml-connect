import { LandingPageHeader } from "./components/LandingPageHeader";
import "./LandingView.scss";
import Header from "../../../components/header/Header";
import DisplayCard, { type DisplayCardT } from "../../../components/displayCard/DisplayCard";
import type { ProjectDetails } from "../../../service/RemoteService/client/bindings/ProjectDetails";
import { projectOverviewRoute } from "../../../routes";

type LandingPageViewProps = {
	projects?: ProjectDetails[];
};

const LandingView = ({ projects }: LandingPageViewProps) => {
	return (
		<>
			<Header headerTitle={"Projects"}>{<LandingPageHeader />}</Header>
			<div className={`body-content-container-with-header-btns-no-footer`}>
				<div className={`main-content-container`}>
					<div className={`LandingView_container`}>
						{projects?.map((project: ProjectDetails) => {
							const displayCard: DisplayCardT = {
								title: project.name,
								description: project.description || "",
								buttonText: "Open Project",
								route: projectOverviewRoute(project.slug),
							};

							return <DisplayCard key={project.id} displayCard={displayCard} />;
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingView;
