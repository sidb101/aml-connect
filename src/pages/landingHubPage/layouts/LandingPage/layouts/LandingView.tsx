import "./LandingView.scss";
import { LandingPageHeader } from "./components/landingPageHeader/LandingPageHeader";
import Header from "../../../../../components/header/Header";
import type { ShallowProjectDetails } from "../../../../../redux/slices/ProjectSlice";
import View from "../../../../../components/view/View";
import type { ReactNode } from "react";
import type { DisplayCardT } from "../../../../../components/displayCard/DisplayCard";
import { projectOverviewRoute } from "../../../../../routes";
import DisplayCard from "../../../../../components/displayCard/DisplayCard";

type LandingPageViewProps = {
	projects?: ShallowProjectDetails[];
};

function LandingView({ projects }: LandingPageViewProps) {
	const header: ReactNode = <Header headerTitle={"Projects"}>{<LandingPageHeader />}</Header>;
	const main: ReactNode = (
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
						projectId: project.id,
					},
				};

				return <DisplayCard key={project.id} displayCard={displayCard} />;
			})}
		</div>
	);

	return <View header={header} main={main} />;
}

export default LandingView;
