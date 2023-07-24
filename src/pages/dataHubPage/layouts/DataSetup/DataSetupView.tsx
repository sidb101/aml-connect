import "./DataSetupView.scss";
import React from "react";
import { modelCreationRoute, projectOverviewRoute } from "../../../../routes";
import Footer from "../../../../components/footer/Footer";

export type DataSetupViewT = {
	data?: string;
};

const DataSetupView = (props: DataSetupViewT) => {
	return <h2>DataSetupView</h2>;
};

export default DataSetupView;
