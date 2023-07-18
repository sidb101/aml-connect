import "./OverviewView.scss";
import React from "react";

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
		</>
	);
};

export default OverviewView;
