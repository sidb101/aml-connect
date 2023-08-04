import "./DataSetupView.scss";
import React, { type JSX, useEffect, useState } from "react";
import AudioFileTable from "./AudioFileTable";
import Accordion from "../../../../components/accordion/Accordion";
import type { GetFilesRequest } from "../../../../clients/api/bindings/GetFilesRequest";
import { createFilesGetRequest, parseFilesGetResponse } from "../../../../clients/api/ApiTransformer";
import type { InputFileMetaDataT } from "../../../../redux/slices/DataHubSlice";
import { dataHubActions, DataSetT, selectInputFiles } from "../../../../redux/slices/DataHubSlice";
import tauriApiClient from "../../../../clients/api/TauriApiClient";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { selectCurrentProjectAudioDir, selectCurrentProjectSlug } from "../../../../redux/slices/GeneralSlice";
import tauriFsClient from "../../../../clients/fs/TauriFsClient";
import Backdrop from "../../../../components/backdrop/Backdrop";

export type DataSetupViewT = {
	importDataComponent: JSX.Element | JSX.Element[];
};

const DataSetupView = ({ importDataComponent }: DataSetupViewT) => {
	const dispatch = useAppDispatch();

	const projectSlug = useAppSelector(selectCurrentProjectSlug);
	const projectAudioDir = useAppSelector(selectCurrentProjectAudioDir);

	const importedInputFiles = useAppSelector((state) => selectInputFiles(state, DataSetT.TRAINING));
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
			setIsLoading(true);
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
			setIsLoading(false);
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
			{isLoading && <Backdrop />}
			<div className={`DataSetupView_leftContainer`}>
				<Accordion bodyMaxHeight={`calc(33vh - 150px)`} header={<>Training Dataset</>}>
					<AudioFileTable files={importedInputFiles} />
				</Accordion>
				<Accordion bodyMaxHeight={`calc(33vh - 150px)`} defaultIsOpen={false} header={<>Validation Dataset</>}>
					<AudioFileTable files={[]} />
				</Accordion>
				<Accordion bodyMaxHeight={`calc(33vh - 150px)`} defaultIsOpen={false} header={<>Testing Dataset</>}>
					<AudioFileTable files={[]} />
				</Accordion>
			</div>
			<div className={`DataSetupView_rightContainer`}>
				<Accordion bodyMaxHeight={`calc(33vh - 150px)`} header={<>Add or Merge Data</>}>
					{importDataComponent}
				</Accordion>
				<Accordion bodyMaxHeight={`calc(33vh - 150px)`} header={<>Label Data</>} defaultIsOpen={false}>
					<>Label Body</>
				</Accordion>
			</div>
		</div>
	);
};

export default DataSetupView;
