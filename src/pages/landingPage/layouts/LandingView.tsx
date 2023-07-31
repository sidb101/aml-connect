import { LandingPageHeader } from "./components/LandingPageHeader";
import "./LandingView.scss";
import Header from "../../../components/header/Header";
import ProjectCard, { type ProjectCardT } from "./components/ProjectCard";

const projectCards: ProjectCardT[] = [
	{
		projectSlug: "project-1",
		projectTitle: "Glass Break Detection",
		projectLabel: ["94.3% Accuracy", "97.6% True Positive Rate", "3sec in 24hr False Positive Rate"],
		projectDescription:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
	},
];

export type LandingPageViewT = {
	data?: string;
};

const LandingView = (props: LandingPageViewT) => {
	return (
		<>
			<Header headerTitle={"Projects"} element={<LandingPageHeader />} />
			<div className={`body-content-container-no-footer`}>
				<div className={`main-content-container`}>
					<div className={`LandingView_container`}>
						{projectCards.map((projectCard: ProjectCardT, index: number) => (
							<ProjectCard key={index} projectCard={projectCard} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingView;
