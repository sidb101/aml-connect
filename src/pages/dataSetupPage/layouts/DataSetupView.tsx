import "./DataSetupView.scss";
import React from "react";
import Footer from "../../../components/footer/Footer";
import { modelCreationRoute, projectOverviewRoute } from "../../../routes";

export type DataSetupViewT = {
	data?: string;
};

const DataSetupView = (props: DataSetupViewT) => {
	return (
		<>
			<div className={`header-content-container`}>
				<h1>DataSetupPage</h1>
			</div>
			<div className={`body-content-container`}></div>
			<Footer
				prevBtn={{ label: "Overview", route: projectOverviewRoute("project-1") }}
				nextBtn={{ label: "Model Creation", route: modelCreationRoute("project-1") }}
			/>
		</>
	);
};

export default DataSetupView;
