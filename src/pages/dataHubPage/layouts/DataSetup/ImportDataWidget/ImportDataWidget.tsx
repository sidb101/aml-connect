import ImportLocalData from "./ImportLocalData";
import ImportDataView from "./ImportDataView";
import React, { useState } from "react";
import { DataSetT } from "../../../../../redux/slices/DataHubSlice";
import Accordion from "../../../../../components/accordion/Accordion";

type ImportDataWidgetProps = {
	widgetHeight?: string;
};

/**
 * There can be various sources of data (Local, Drive, Cloud, etc.)
 */
enum DataSourceT {
	NONE,
	LOCAL,
}

/**
 * Module to handle all the functionalities regarding importing the data from various sources,
 * and rendering components for that.
 */
const ImportDataWidget = ({ widgetHeight }: ImportDataWidgetProps) => {
	//To choose the right data source component to render
	const [dataSource, setDataSource] = useState<DataSourceT>(DataSourceT.NONE);
	const [dataType, setDataType] = useState<DataSetT>(DataSetT.TRAINING);

	/*** Handlers when user chooses various data sources ***/
	const handleLocalImport = () => {
		setDataSource(DataSourceT.LOCAL);
	};

	const closeDataSource = () => {
		setDataSource(DataSourceT.NONE);
	};

	//Render only when widgetHeight is specified
	return (
		widgetHeight && (
			<Accordion maxBodyHeight={widgetHeight} header={<>Add or Merge Data</>}>
				<ImportDataView dataType={dataType} onDataTypeChange={setDataType} onLocalImport={handleLocalImport} />
				{/* Render components based on the source chosen by the user in ImportDataView */}
				{dataSource === DataSourceT.LOCAL && <ImportLocalData dataSet={dataType} onClose={closeDataSource} />}
			</Accordion>
		)
	);
};

export default ImportDataWidget;
