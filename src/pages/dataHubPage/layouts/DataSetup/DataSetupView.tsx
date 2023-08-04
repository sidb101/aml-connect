import "./DataSetupView.scss";
import React, { type JSX, useEffect } from "react";
import Accordion from "../../../../components/accordion/Accordion";
import type { GetFilesRequest } from "../../../../clients/api/bindings/GetFilesRequest";
import { createFilesGetRequest, parseFilesGetResponse } from "../../../../clients/api/ApiTransformer";
import type { InputFileMetaDataT } from "../../../../redux/slices/DataHubSlice";
import { dataHubActions, DataSetT, selectInputFiles } from "../../../../redux/slices/DataHubSlice";
import tauriApiClient from "../../../../clients/api/TauriApiClient";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { selectCurrentProjectAudioDir, selectCurrentProjectSlug } from "../../../../redux/slices/GeneralSlice";
import tauriFsClient from "../../../../clients/fs/TauriFsClient";
import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";

export type DataSetupViewT = {
	importDataComponent: JSX.Element | JSX.Element[];
};

const DataSetupView = ({ importDataComponent }: DataSetupViewT) => {
	const dispatch = useAppDispatch();

	const projectSlug = useAppSelector(selectCurrentProjectSlug);
	const projectAudioDir = useAppSelector(selectCurrentProjectAudioDir);

	const importedInputFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.TRAINING));

	// console.log("Rendering: ", importedInputFiles, projectSlug);
	useEffect(() => {
		if (projectSlug != "" && importedInputFiles.length == 0) {
			getInputFiles(DataSetT.TRAINING).catch((e) => console.error(e));
		}
	}, [projectSlug]);

	/**
	 * Will get the input files metadata from the server, and then read the corresponding file binaries from the
	 * filesystem
	 * @param dataSet: The type of input files to be fetched.
	 */
	const getInputFiles = async (dataSet: DataSetT) => {
		try {
			const inputFilesMetaData = await getFilesMetaData(dataSet);

			//get the files data along with content from the given metadata
			const inputFiles = await Promise.all(
				inputFilesMetaData.map(
					async (fileMetaData) => await tauriFsClient.readInputFileFromStorage(fileMetaData, projectAudioDir)
				)
			);

			console.log("Read the files: ", inputFiles);

			//update it in the redux state
			dispatch(dataHubActions.setInputFiles({ dataSet, inputFiles }));
			console.log("Set input files in the redux state");
		} catch (e) {
			console.error(e);
		}
	};

	const getFilesMetaData = async (dataSet: DataSetT) => {
		//get the files information
		const filesGetRequest: GetFilesRequest = createFilesGetRequest(projectSlug, dataSet);
		console.log("Request", filesGetRequest);

		const filesGetResponse = await tauriApiClient.getInputFiles(filesGetRequest);
		console.log(filesGetResponse);

		const inputFilesMetaData: InputFileMetaDataT[] = parseFilesGetResponse(filesGetResponse);
		console.log("Transformed: ", inputFilesMetaData);

		return inputFilesMetaData;
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
