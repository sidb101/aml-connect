import ImportLocalData from "./ImportLocalData";
import ImportDataView from "./ImportDataView";
import { useState } from "react";
import { DataSetT } from "../../../../../redux/slices/DataHubSlice";

export type ImportDataT = {
	data?: string;
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
const ImportData = (props: ImportDataT) => {
	//To choose the right data source component to render
	const [dataSource, setDataSource] = useState<DataSourceT>(DataSourceT.NONE);
	const [dataType, setDataType] = useState<DataSetT>(DataSetT.TRAINING);

	const handleLocalImport = () => {
		setDataSource(DataSourceT.LOCAL);
	};

	const closeDataSource = () => {
		setDataSource(DataSourceT.NONE);
	};

	return (
		<>
			<ImportDataView dataType={dataType} onDataTypeChange={setDataType} onLocalImport={handleLocalImport} />
			{dataSource === DataSourceT.LOCAL && <ImportLocalData onClose={closeDataSource} />}
		</>
	);
};

export default ImportData;
