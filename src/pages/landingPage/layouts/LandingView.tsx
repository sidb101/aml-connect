import { LandingPageHeader } from "./components/LandingPageHeader";
import React from "react";
import "./LandingView.scss";
import Header from "../../../components/header/Header";
import ProjectCard from "./components/ProjectCard";

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
						<div className={`LandingView_containerRow`}>
							<ProjectCard />
							<ProjectCard />
						</div>
						<div className={`LandingView_containerRow`}>
							<ProjectCard />
							<ProjectCard />
						</div>
						<div className={`LandingView_containerRow`}>
							<ProjectCard />
							<ProjectCard />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingView;
