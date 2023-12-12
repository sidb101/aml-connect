import "./DataSetupView.scss";
import React, { type ReactNode, useEffect, useRef } from "react";
import type { DataSetupWidgetHeightsT } from "./DataSetup";

export type DataSetupViewProps = {
	setDataSetupWidgetHeights: React.Dispatch<React.SetStateAction<DataSetupWidgetHeightsT>>;
	importDataWidget: ReactNode | ReactNode[];
	trainingDataWidget: ReactNode | ReactNode[];
	testingDataWidget: ReactNode | ReactNode[];
	validationDataWidget: ReactNode | ReactNode[];
	labelDataWidget: ReactNode | ReactNode[];
};
/**
 * A view component that would load the required widgets as per the passed properties
 */
const DataSetupView = ({
	importDataWidget,
	trainingDataWidget,
	testingDataWidget,
	validationDataWidget,
	labelDataWidget,
	setDataSetupWidgetHeights,
}: DataSetupViewProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	//To dynamically resize the Widgets
	const getContainerHeight = () => containerRef.current?.scrollHeight;
	//Gives height of a single accordion, considering the fraction of height allocated for that accordion
	const getWidgetHeight = (fraction: number) => `${(getContainerHeight() || 0) / fraction}px`;

	//setting the heights of the widgets passed
	useEffect(() => {
		setDataSetupWidgetHeights({
			dataset: getWidgetHeight(3),
			importData: getWidgetHeight(2),
			labelData: getWidgetHeight(2),
		});
	}, []);

	//Rendering view with all the widgets
	return (
		<div className={`DataSetupView_container`} ref={containerRef}>
			<div className={`DataSetupView_leftContainer`}>
				{trainingDataWidget}
				{testingDataWidget}
				{validationDataWidget}
			</div>
			<div className={`DataSetupView_rightContainer`}>
				{importDataWidget}
				{labelDataWidget}
			</div>
		</div>
	);
};

export default DataSetupView;
