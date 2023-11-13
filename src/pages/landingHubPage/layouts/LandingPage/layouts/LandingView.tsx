import "./LandingView.scss";
import { LandingPageHeader } from "./components/landingPageHeader/LandingPageHeader";
import Header from "../../../../../components/header/Header";
import { projectOverviewRoute } from "../../../../../routes";
import type { DisplayCardT } from "../../../../../components/displayCard/DisplayCard";
import DisplayCard from "../../../../../components/displayCard/DisplayCard";
import type { ShallowProjectDetails } from "../../../../../redux/slices/ProjectSlice";
import MainContent from "../../../../../components/mainContent/MainContent";
import { useEffect, useState } from "react";

type LandingPageViewProps = {
	projects?: ShallowProjectDetails[];
};

function LandingView({ projects }: LandingPageViewProps) {
	const [headerHeight, setHeaderHeight] = useState(0);

	useEffect(() => {
		const updateHeaderHeight = () => {
			setHeaderHeight(document.getElementById("header").offsetHeight);
		};

		updateHeaderHeight();

		window.addEventListener("resize", updateHeaderHeight);
		return () => window.removeEventListener("resize", updateHeaderHeight);
	}, []);

	return (
		<>
			<Header headerTitle={"Projects"}>{<LandingPageHeader />}</Header>
			<MainContent headerHeight={headerHeight}>
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
			</MainContent>
		</>
	);
}

export default LandingView;
