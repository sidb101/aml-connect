import "./LandingView.scss";
import { LandingPageHeader } from "./components/landingPageHeader/LandingPageHeader";
import Header from "../../../../../components/header/Header";
import { projectOverviewRoute } from "../../../../../routes";
import type { DisplayCardT } from "../../../../../components/displayCard/DisplayCard";
import DisplayCard from "../../../../../components/displayCard/DisplayCard";
import type { ShallowProjectDetails } from "../../../../../redux/slices/ProjectSlice";

type LandingPageViewProps = {
	projects?: ShallowProjectDetails[];
};

function LandingView({ projects }: LandingPageViewProps) {
	return (
		<>
			<Header headerTitle={"Projects"}>{<LandingPageHeader />}</Header>
			<div className={`body-content-container-with-header-btns-no-footer`}>
				<div className={`LandingView_container`}>
					{projects?.map((project: ShallowProjectDetails) => {
						const displayCard: DisplayCardT = {
							title: project.name,
							labels: ["AnalogML Connect"],
							description: project.description || "",
							buttonText: "Open Project",
							route: projectOverviewRoute(project.slug),
							deletable: {
								showCross: true,
								projectSlug: project.slug,
							},
						};

						return <DisplayCard key={project.id} displayCard={displayCard} />;
					})}
				</div>
			</div>
		</>
	);
}

export default LandingView;
