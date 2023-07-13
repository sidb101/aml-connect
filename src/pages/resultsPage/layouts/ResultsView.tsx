import "./ResultsView.scss";
import React from "react";

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
		</>
	);
};

export default ResultsView;
