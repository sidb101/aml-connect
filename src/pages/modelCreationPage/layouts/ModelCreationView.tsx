import "./ModelCreationView.scss";
import React from "react";
import Footer from "../../../components/footer/Footer";
import { dataSetupRoute, dataVizRoute, resultsRoute } from "../../../routes";

export type ModelCreationViewT = {
	data?: string;
};

const ModelCreationView = (props: ModelCreationViewT) => {
	return (
		<>
			<div className={`header-content-container`}>
				<h1>ModelCreationPage</h1>
			</div>
			<div className={`body-content-container`}></div>
			<Footer
				prevBtn={{ label: "Visualize Data", route: dataVizRoute("project-1") }}
				nextBtn={{ label: "Results", route: resultsRoute("project-1") }}
			/>
		</>
	);
};

export default ModelCreationView;
