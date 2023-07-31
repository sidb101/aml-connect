import "./OverviewView.scss";
import type { PropsWithChildren } from "react";

const OverviewView = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className={`body-content-container-no-header-btns OverviewView_container`}>{children}</div>
		</>
	);
};

export default OverviewView;
