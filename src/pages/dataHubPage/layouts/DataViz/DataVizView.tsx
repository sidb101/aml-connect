import "./DataVizView.scss";
import React from "react";

export type DataVizViewT = {
	data?: string;
};

const DataVizView = (props: DataVizViewT) => {
	return (
		<>
			<div className={`body-content-container`}>
				<h2>DataVizView</h2>
			</div>
		</>
	);
};

export default DataVizView;
