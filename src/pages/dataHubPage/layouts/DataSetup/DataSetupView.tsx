import "./DataSetupView.scss";
import React from "react";

export type DataSetupViewT = {
	data?: string;
};

const DataSetupView = (props: DataSetupViewT) => {
	return (
		<>
			<div className={`body-content-container`}>
				<h2>DataSetupView</h2>
			</div>
		</>
	);
};

export default DataSetupView;
