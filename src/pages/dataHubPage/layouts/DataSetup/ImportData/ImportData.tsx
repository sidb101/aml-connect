import ImportLocalData from "./ImportLocalData";

export type ImportDataT = {
	data?: string;
};

/**
 * Module to handle all the functionalities regarding importing the data from various sources,
 * and rendering components for that.
 */
const ImportData = (props: ImportDataT) => {
	return <ImportLocalData />;
};

export default ImportData;
