import "./SendToHardwareView.scss";
import React from "react";
import { resultsComparisonRoute, resultsRoute } from "../../../routes";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import type { DisplayCardT } from "../../../components/displayCard/DisplayCard";
import DisplayCard from "../../../components/displayCard/DisplayCard";
import View from "../../../components/view/View";

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

	const header = <Header headerTitle={`${props.title}`} />;
	const main = (
		<div className={`SendToHardwareView_container`}>
			<DisplayCard displayCard={sentToHardwareCard} />
		</div>
	);
	const footer = (
		<Footer
			footerBtnGroup={{
				prevBtn: { label: "Results Comparison", route: resultsComparisonRoute(props.projectSlug) },
				nextBtn: { label: "Homepage", route: "/" },
			}}
		/>
	);

	return <View header={header} main={main} footer={footer} />;
};

export default SendToHardwareView;
