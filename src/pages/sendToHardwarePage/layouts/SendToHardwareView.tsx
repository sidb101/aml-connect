import "./SendToHardwareView.scss";
import React from "react";
import { resultsRoute } from "../../../routes";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";

export type SendToHardwareViewT = {
	data?: string;
	title: string;
	projectSlug: string;
};

const SendToHardwareView = (props: SendToHardwareViewT) => {
	return (
		<>
			<Header headerTitle={`${props.title}`} />
			<div className={`body-content-container`}></div>
			<Footer prevBtn={{ label: "Results", route: resultsRoute(props.projectSlug) }} />
		</>
	);
};

export default SendToHardwareView;
