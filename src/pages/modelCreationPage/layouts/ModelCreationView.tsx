import "./ModelCreationView.scss";
import React from "react";

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
		</>
	);
};

export default ModelCreationView;
