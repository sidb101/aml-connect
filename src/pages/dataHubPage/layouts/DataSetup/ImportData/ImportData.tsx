import ImportDataView from "./ImportDataView";

export type ImportDataT = {
	data?: string;
};

/**
 * Module to handle all the functionalities regarding importing the data from various sources,
 * and providing a view for that
 */
const ImportData = (props: ImportDataT) => {
	return <ImportDataView />;
};

export default ImportData;
