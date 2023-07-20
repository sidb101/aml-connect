import "./ResultsView.scss";
import React from "react";
import { modelCreationRoute, sendToHardwareRoute } from "../../../routes";
import Footer from "../../../components/footer/Footer";

export type ResultsViewT = {
	data?: string;
};

const ResultsView = (props: ResultsViewT) => {
	return (
		<>
			<div className={`header-content-container`}>
				<h1>ResultsPage</h1>
			</div>
			<div className={`body-content-container`}></div>
			<Footer
				prevBtn={{ label: "Model Creation", route: modelCreationRoute("project-1") }}
				nextBtn={{ label: "Send To Hardware", route: sendToHardwareRoute("project-1") }}
			/>
		</>
	);
};

export default ResultsView;
