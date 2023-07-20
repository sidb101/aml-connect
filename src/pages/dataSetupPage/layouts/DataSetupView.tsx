import "./DataSetupView.scss";
import React from "react";
import Footer from "../../../components/footer/Footer";
import { modelCreationRoute, projectOverviewRoute } from "../../../routes";
import Header from "../../../components/header/Header";

export type DataSetupViewT = {
	data?: string;
	title: string;
	projectSlug: string;
};

const DataSetupView = (props: DataSetupViewT) => {
	return (
		<>
			<Header headerTitle={`${props.title}`} />
			<div className={`body-content-container`}></div>
			<Footer
				prevBtn={{ label: "Overview", route: projectOverviewRoute(props.projectSlug) }}
				nextBtn={{ label: "Model Creation", route: modelCreationRoute(props.projectSlug) }}
			/>
		</>
	);
};

export default DataSetupView;
