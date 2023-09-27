import "./LabelDataWidget.scss";
import Accordion from "../../../../../components/accordion/Accordion";
import React from "react";

export type LabelDataWidgetT = {
	widgetHeight?: string;
};

const LabelDataWidget = ({ widgetHeight }: LabelDataWidgetT) => {
	return (
		widgetHeight && (
			<Accordion bodyMaxHeight={widgetHeight} header={<>Label Data</>} defaultIsOpen={false}>
				<h4>Label Body</h4>
			</Accordion>
		)
	);
};

export default LabelDataWidget;
