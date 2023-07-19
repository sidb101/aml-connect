import "./ModelCreationView.scss";
import React from "react";
import Footer from "../../../components/footer/Footer";

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
			<Footer nextBtn={{ label: "Next", route: "/next-route" }} />
		</>
	);
};

export default ModelCreationView;
