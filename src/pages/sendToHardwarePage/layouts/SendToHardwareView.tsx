import "./SendToHardwareView.scss";
import React from "react";

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
		</>
	);
};

export default SendToHardwareView;
