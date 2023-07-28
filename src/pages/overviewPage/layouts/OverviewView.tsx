import "./OverviewView.scss";
import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import { dataHubRoute, dataSetupRoute } from "../../../routes";
import Header from "../../../components/header/Header";
import ProjectDescription from "./ProjectDescription";
import ProjectName from "./ProjectName";

export type OverviewViewT = {
	projectTitle: string;
	onProjectTitleChange: (newProjectName: string) => void;
	projectSlug: string;
};

const OverviewView = ({ projectTitle, onProjectTitleChange, projectSlug }: OverviewViewT) => {
	//const [projectName, setProjectName] = useState<string>(projectTitle);

	return (
		<>
			<Header headerTitle={`${projectTitle} > Overview`} />
			<div className={`body-content-container`}>
				<div className={`OverviewView_container`}>
					<div className={`white-panel OverviewView_column1`}>
						<div className={`section-heading-text OverviewView_mainColumn`}>Overview</div>
						<div className={`OverviewView_detailsContainer`}>
							<div className={`OverviewView_projectNameContainer`}>
								<ProjectName projectName={projectTitle} onProjectTitleChange={onProjectTitleChange} />
							</div>
							<div className={`OverviewView_projectDescriptionContainer`}>
								<ProjectDescription />
								<div className={`OverviewView_saveBtnContainer`}>
									<button className={`btn btn-outline`}>Save</button>
								</div>
							</div>
						</div>
					</div>
					{/*<div className={`OverviewView_column2`}>*/}
					{/*	<div className={`white-panel section-heading-text OverviewView_mainColumn`}>*/}
					{/*		Power Estimation*/}
					{/*	</div>*/}
					{/*	<div className={`white-panel OverviewView_column2SubContainer`}></div>*/}
					{/*</div>*/}
				</div>
			</div>
			<Footer nextBtn={{ label: "Data Hub", route: dataSetupRoute(projectSlug) }} />
		</>
	);
};

export default OverviewView;
