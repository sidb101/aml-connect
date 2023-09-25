import "./SendToHardwareView.scss";
import React from "react";
import { resultsRoute } from "../../../routes";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import type { DisplayCardT } from "../../../components/displayCard/DisplayCard";
import DisplayCard from "../../../components/displayCard/DisplayCard";

export type SendToHardwareViewT = {
	data?: string;
	title: string;
	projectSlug: string;
};

const SendToHardwareView = (props: SendToHardwareViewT) => {
	const sentToHardwareCard: DisplayCardT = {
		route: "/",
		title: "You're all set. Leave the rest to us.",
		description:
			"Since now you're done making your AnalogML model, Aspinity will configure your code to run on the RAMP chip. If you're ready to proceed, click on the button below and we will raise a service ticket for this code.",
		buttonText: "Send to Aspinity",
	};

	return (
		<>
			<Header headerTitle={`${props.title}`} />
			<div className={`body-content-container-no-header-btns-with-footer`}>
				<div className={`SendToHardwareView_container`}>
					<DisplayCard displayCard={sentToHardwareCard} />
				</div>
			</div>
			<Footer
				footerBtnGroup={{
					prevBtn: { label: "Results", route: resultsRoute(props.projectSlug) },
					nextBtn: { label: "Homepage", route: "/" },
				}}
			/>
		</>
	);
};

export default SendToHardwareView;
