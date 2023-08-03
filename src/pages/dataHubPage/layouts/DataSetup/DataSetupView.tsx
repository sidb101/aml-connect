import "./DataSetupView.scss";
import React, { type JSX, useEffect } from "react";
import Accordion from "../../../../components/accordion/Accordion";
import type { GetFilesRequest } from "../../../../clients/api/bindings/GetFilesRequest";
import { createFilesGetRequest, parseFilesGetResponse } from "../../../../clients/api/ApiTransformer";
import type { InputFileDataT } from "../../../../redux/slices/DataHubSlice";
import { dataHubActions, DataSetT, selectInputFiles } from "../../../../redux/slices/DataHubSlice";
import tauriApiClient from "../../../../clients/api/TauriApiClient";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/GeneralSlice";

export type DataSetupViewT = {
	importDataComponent: JSX.Element | JSX.Element[];
};

const DataSetupView = ({ importDataComponent }: DataSetupViewT) => {
	const dispatch = useAppDispatch();

	const projectSlug = useAppSelector(selectCurrentProjectSlug);

	const importedInputFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.TRAINING));

	console.log("Rendering: ", importedInputFiles, projectSlug);
	useEffect(() => {
		if (projectSlug != "" && importedInputFiles.length == 0) {
			getInputFiles(projectSlug, DataSetT.TRAINING).catch((e) => console.log(e));
		}
	}, [projectSlug]);

	const getInputFiles = async (projectSlug: string, dataset: DataSetT) => {
		//get the files information
		const filesGetRequest: GetFilesRequest = createFilesGetRequest(projectSlug, dataset);
		console.log("Request", filesGetRequest);
		const filesGetResponse = await tauriApiClient.getInputFiles(filesGetRequest);
		console.log(filesGetResponse);
		const inputFiles: InputFileDataT[] = parseFilesGetResponse(filesGetResponse);
		console.log("Transformed: ", inputFiles);

		//update it in the redux state
		dispatch(dataHubActions.setInputFiles({ dataSet: dataset, inputFiles: inputFiles }));
	};

	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<Accordion
					headerElement={<>Training Dataset</>}
					maxHeight={"500px"}
					bodyElement={
						<>
							{importedInputFiles.map((inputFile, index) => (
								<div key={index}>
									<span>{inputFile.metadata.name}</span>
									<br />
								</div>
							))}
						</>
					}
				/>
				<Accordion
					headerElement={<>Validation Dataset</>}
					bodyElement={<h4>Validation Body</h4>}
					maxHeight={"300px"}
					defaultIsOpen={false}
				/>
				<Accordion
					headerElement={<>Testing Dataset</>}
					bodyElement={<h4>Testing Body</h4>}
					defaultIsOpen={false}
				/>
			</div>
			<div className={`DataSetupView_rightContainer`}>
				<Accordion
					headerElement={<div className={`section-heading-text`}>Add or Merge Data</div>}
					bodyElement={importDataComponent}
				/>
				<Accordion headerElement={<>Label Data</>} bodyElement={<h4>Label Body</h4>} defaultIsOpen={false} />
			</div>
		</div>
	);
};

export default DataSetupView;
