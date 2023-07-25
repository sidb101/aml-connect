import "./ResultsView.scss";
import React from "react";
import { modelCreationRoute, sendToHardwareRoute } from "../../../routes";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";

export type ResultsViewT = {
	data?: string;
	title: string;
	projectSlug: string;
};

const ResultsView = (props: ResultsViewT) => {
	return (
		<>
			<Header headerTitle={`${props.title}`} />
			<div className={`body-content-container`}></div>
			<Footer
				prevBtn={{ label: "Model Creation", route: modelCreationRoute(props.projectSlug) }}
				nextBtn={{ label: "Send To Hardware", route: sendToHardwareRoute(props.projectSlug) }}
			/>
		</>
	);
};

export default ResultsView;
