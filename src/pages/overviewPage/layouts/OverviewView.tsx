import "./OverviewView.scss";
import React from "react";
import Footer from "../../../components/footer/Footer";
import { dataHubRoute, dataSetupRoute } from "../../../routes";
import Header from "../../../components/header/Header";
import ProjectDescription from "./ProjectDescription";
import ProjectName from "./ProjectName";

export type OverviewViewT = {
	data?: string;
	title: string;
	projectSlug: string;
};

const OverviewView = (props: OverviewViewT) => {
	return (
		<>
			{/*<Header headerTitle={`Glass Break > Overview`} />*/}
			<Header headerTitle={`${props.title}`} />
			<div className={`body-content-container`}>
				<div className={`OverviewView_container`}>
					<div className={`OverviewView_column1 white-panel`}>
						<div className={`section-heading-text OverviewView_mainColumn`}>Overview</div>
						<div className={`OverviewView_detailsContainer`}>
							<div className={`OverviewView_projectNameContainer`}>
								<ProjectName />
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
			<Footer nextBtn={{ label: "Data Hub", route: dataSetupRoute(props.projectSlug) }} />
		</>
	);
};

export default OverviewView;
