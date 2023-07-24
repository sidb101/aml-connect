import "./ModelCreationView.scss";
import React from "react";
import Footer from "../../../components/footer/Footer";
import { dataHubRoute, dataSetupRoute, dataVizRoute, resultsRoute } from "../../../routes";
import Header from "../../../components/header/Header";

export type ModelCreationViewT = {
	data?: string;
	title: string;
	projectSlug: string;
};

const ModelCreationView = (props: ModelCreationViewT) => {
	return (
		<>
			<Header headerTitle={`${props.title}`} />
			<div className={`body-content-container`}></div>
			<Footer
				prevBtn={{ label: "Data Hub", route: dataSetupRoute(props.projectSlug) }}
				nextBtn={{ label: "Results", route: resultsRoute(props.projectSlug) }}
			/>
		</>
	);
};

export default ModelCreationView;
