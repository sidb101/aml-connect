import "./Spinner.scss";
import React from "react";
import spinner from "./AspinityBigLogo.png";
import { testIds } from "../../tests/test-utils";

const Spinner: React.FC = () => {
	return (
		<div className={`Spinner`} data-testid={testIds.spinner}>
			<div className={`Spinner_iconBackground`}>
				<img src={spinner} alt="Loading..." />
			</div>
		</div>
	);
};

export default Spinner;
