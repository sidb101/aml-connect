import "./OverviewView.scss";
import React from "react";
import Footer from "../../../components/footer/Footer";
import { dataHubRoute, dataSetupRoute } from "../../../routes";

export type OverviewViewT = {
	data?: string;
};

const OverviewView = (props: OverviewViewT) => {
	return (
		<>
			<div className={`header-content-container`}>
				<h1>OverviewPage</h1>
			</div>
			<div className={`body-content-container`}></div>
			<Footer nextBtn={{ label: "Data Setup", route: dataSetupRoute("project-1") }} />
		</>
	);
};

export default OverviewView;
