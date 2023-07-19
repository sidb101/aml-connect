import "./DataSetupView.scss";
import { LandingPageHeader } from "../../landingPage/layouts/components/LandingPageHeader";
import React from "react";
import Footer from "../../../components/footer/Footer";

export type DataSetupViewT = {
	data?: string;
};

const DataSetupView = (props: DataSetupViewT) => {
	return (
		<>
			<div className={`header-content-container`}>
				<h1>DataSetupPage</h1>
			</div>
			<div className={`body-content-container`}></div>
			<Footer prevBtn={{ label: "Previous", route: "/previous-route" }} />
		</>
	);
};

export default DataSetupView;
