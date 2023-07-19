import "./DataSetupView.scss";
import React from "react";
import { modelCreationRoute, projectOverviewRoute } from "../../../../routes";
import Footer from "../../../../components/footer/Footer";

export type DataSetupViewT = {
	data?: string;
};

const DataSetupView = (props: DataSetupViewT) => {
	return (
		<>
			<div className={`body-content-container`}>
				<h2>DataSetupView</h2>
			</div>
		</>
	);
};

export default DataSetupView;
