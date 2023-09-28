import "./Spinner.scss";
import React from "react";
import spinner from "./AspinityBigLogo.png";

const Spinner: React.FC = () => {
	return (
		<div className={`Spinner`}>
			<div className={`Spinner_iconBackground`}>
				<img src={spinner} alt="Loading..." />
			</div>
		</div>
	);
};

export default Spinner;
