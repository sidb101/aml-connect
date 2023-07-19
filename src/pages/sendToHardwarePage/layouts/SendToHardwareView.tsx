import "./SendToHardwareView.scss";
import React from "react";
import { resultsRoute } from "../../../routes";
import Footer from "../../../components/footer/Footer";

export type SendToHardwareViewT = {
	data?: string;
};

const SendToHardwareView = (props: SendToHardwareViewT) => {
	return (
		<>
			<div className={`header-content-container`}>
				<h1>SendToHardwarePage</h1>
			</div>
			<div className={`body-content-container`}></div>
			<Footer prevBtn={{ label: "Results", route: resultsRoute("project-1") }} />
		</>
	);
};

export default SendToHardwareView;
