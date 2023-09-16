import { LandingPageHeader } from "./components/LandingPageHeader";
import "./LandingView.scss";
import Header from "../../../components/header/Header";
import ProjectCard, { type ProjectCardT } from "../../../components/projectCard/ProjectCard";

type LandingPageViewProps = {
	projectCards?: ProjectCardT[];
};

const LandingView = ({ projectCards }: LandingPageViewProps) => {
	return (
		<>
			<Header headerTitle={"Projects"} element={<LandingPageHeader />} />
			<div className={`body-content-container-no-footer`}>
				<div className={`main-content-container`}>
					<div className={`LandingView_container`}>
						{projectCards?.map((projectCard: ProjectCardT, index: number) => (
							<ProjectCard key={index} projectCard={projectCard} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingView;
