import "./LabelDataWidget.scss";
import Accordion from "../../../../../components/accordion/Accordion";
import React from "react";

type LabelDataWidgetProps = {
	widgetHeight?: string;
};

const LabelDataWidget = ({ widgetHeight }: LabelDataWidgetProps) => {
	return (
		widgetHeight && (
			<Accordion maxBodyHeight={widgetHeight} header={<>Label Data</>} defaultIsOpen={false}>
				<h4>Label Body</h4>
			</Accordion>
		)
	);
};

export default LabelDataWidget;
