import "./SendToHardwareView.scss";
import React from "react";
import { resultsComparisonRoute } from "../../../routes";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import type { DisplayCardT } from "../../../components/displayCard/DisplayCard";
import DisplayCard from "../../../components/displayCard/DisplayCard";
import { useDispatch } from "react-redux";
import { projectsActions } from "../../../redux/slices/ProjectsSlice";

export type SendToHardwareViewProps = {
	title: string;
	projectSlug: string;
};

const SendToHardwareView = ({ title, projectSlug }: SendToHardwareViewProps) => {
	const dispatch = useDispatch();

	function handleReturnToHomePage() {
		dispatch(projectsActions.closeProject());
	}

	const sendToHardwareCard: DisplayCardT = {
		route: "/",
		title: "You're all set. Leave the rest to us.",
		description:
			"Since now you're done making your AnalogML model, Aspinity will configure your code to run on the RAMP chip. If you're ready to proceed, click on the button below and we will raise a service ticket for this code.",
		buttonText: "Send to Aspinity",
		onClick: handleReturnToHomePage,
	};

	return (
		<>
			<Header headerTitle={`${title}`} />
			<div className={`body-content-container-no-header-btns-with-footer`}>
				<div className={`SendToHardwareView_container`}>
					<DisplayCard displayCard={sendToHardwareCard} />
				</div>
			</div>
			<Footer
				footerBtnGroup={{
					prevBtn: { label: "Results Comparison", route: resultsComparisonRoute(projectSlug) },
					nextBtn: { label: "Homepage", route: "/", onClick: handleReturnToHomePage },
				}}
			/>
		</>
	);
};

export default SendToHardwareView;
