import DataSetupView from "./DataSetupView";
import React, { useState } from "react";
import { DataSetT } from "../../../../redux/slices/DataHubSlice";
import DatasetWidget from "./DatasetWidget/DatasetWidget";
import LabelDataWidget from "./LabelDataWidget/LabelDataWidget";
import ImportDataWidget from "./ImportDataWidget/ImportDataWidget";

/**
 * Object to store the heights of various widgets
 */
export type DataSetupWidgetHeightsT = {
	dataset?: string;
	importData?: string;
	labelData?: string;
};
const DataSetup = () => {
	//Heights of the Widgets to load. The value would be dependent on the size of the view these widgets are rendered in
	//Therefore, would set the value inside the View
	const [dataSetupWidgetHeights, setDataSetupWidgetHeights] = useState<DataSetupWidgetHeightsT>({});

	//Passing in the required widgets along with the method to set their heights
	return (
		<DataSetupView
			trainingDataWidget={
				<DatasetWidget
					datasetType={DataSetT.TRAINING}
					header={<>Training Dataset</>}
					widgetHeight={dataSetupWidgetHeights.dataset}
					defaultIsOpen={true}
				/>
			}
			testingDataWidget={
				<DatasetWidget
					datasetType={DataSetT.TESTING}
					header={<>Testing Dataset</>}
					widgetHeight={dataSetupWidgetHeights.dataset}
					defaultIsOpen={false}
				/>
			}
			validationDataWidget={
				<DatasetWidget
					datasetType={DataSetT.VALIDATION}
					header={<>Validation Dataset</>}
					widgetHeight={dataSetupWidgetHeights.dataset}
					defaultIsOpen={false}
				/>
			}
			importDataWidget={<ImportDataWidget widgetHeight={dataSetupWidgetHeights.importData} />}
			labelDataWidget={<LabelDataWidget widgetHeight={dataSetupWidgetHeights.labelData} />}
			setDataSetupWidgetHeights={setDataSetupWidgetHeights}
		/>
	);
};

export default DataSetup;
