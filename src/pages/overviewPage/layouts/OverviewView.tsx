import "./OverviewView.scss";
import React from "react";
import Footer from "../../../components/footer/Footer";

export type OverviewViewT = {
	data?: string;
};

const OverviewView = (props: OverviewViewT) => {
	return (
		<>
			<div className={`header-content-container`}>
				<h1>OverviewPage</h1>
			</div>
			<div className={`body-content-container`}></div>
			<Footer
				prevBtn={{ label: "Previous", route: "/previous-route" }}
				nextBtn={{ label: "Next", route: "/next-route" }}
			/>
		</>
	);
};

export default OverviewView;
