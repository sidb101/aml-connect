import "./ImportLocalDataView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import { useState } from "react";
import CenterModal from "../../../../../components/modal/CenterModal";
import { type FileContent, useFilePicker } from "use-file-picker";
import ReactPlayer from "react-player";
import { SUPPORTED_FILE_TYPES } from "../../../../../constants";
import type { InputFileDataT } from "../../../../../redux/slices/DataHubSlice";
import { getFileExtension } from "../../../../../clients/api/ApiTransformer";

export type ImportDataViewT = {
	handleFilesImport: (files: InputFileDataT[]) => Promise<void>;
};

const ImportLocalDataView = ({ handleFilesImport }: ImportDataViewT) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [playingIndex, setPlayingIndex] = useState<number>(-1);
	const [selectedFiles, setSelectedFiles] = useState<FileContent[]>([]);

	//Get the file picker component
	const [openFileSelector] = useFilePicker({
		accept: SUPPORTED_FILE_TYPES,
		readAs: "DataURL",
		onFilesSuccessfulySelected: ({ filesContent }) => {
			setSelectedFiles(filesContent);
		},
	});

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setSelectedFiles([]);
	};

	/**
	 * Method to play and pause any particular file
	 * @param index Index of the file to be played.
	 */
	const handlePlayToggle = (index: number) => {
		index == playingIndex ? setPlayingIndex(-1) : setPlayingIndex(index);
	};

	/**
	 * Handler when user clicks the import files button in the modal.
	 * @param files: Selected Files
	 */
	const importFiles = (files: FileContent[]) => {
		const chosenFiles: InputFileDataT[] = files.map((file) => {
			const extension = getFileExtension(file.name);
			return {
				metadata: { name: file.name, extension, mediaType: `audio/${extension}` },
				dataUrl: file.content,
			};
		});

		handleFilesImport(chosenFiles).catch((e) => console.error(e));
		handleModalClose();
	};

	return (
		<>
			<div className={"ImportDataView_container"}>
				<div className={`ImportDataView_dataTypeContainer`}>Type of Data</div>
				<div className={`ImportDataView_btnContainer`}>
					<button className={`btn btn-light-outline ImportDataView_btn`} onClick={handleModalOpen}>
						Import Files &nbsp; <FontAwesomeIcon icon={faArrowUpFromBracket} />
					</button>
					<div className={`light-grey-text small-text ImportDataView_btnHint`}>WAV format supported only</div>
				</div>
			</div>
			{modalOpen && (
				<CenterModal
					onClose={handleModalClose}
					closeOnBackdropClick={false}
					headerElement={<div className={`section-subheading-text`}>Import Files</div>}
					modalWidth={"60%"}
					modalHeight={"70%"}
				>
					<div className={`ImportDataView_modalBodyContainer`}>
						<div className={`ImportDataView_uploadRegion`}>
							{selectedFiles.length > 0 && (
								<div style={{ marginBottom: "20px" }}>
									{selectedFiles.map((file, index) => (
										<div key={index}>
											<div className={`ImportDataView_fileContainer`}>
												{file.name}: &nbsp; &nbsp; &nbsp;
												<button
													className={`btn btn-light-solid`}
													onClick={() => handlePlayToggle(index)}
												>
													{" "}
													{playingIndex == index ? `Stop` : `Play`}
												</button>
												<ReactPlayer url={file.content} playing={playingIndex == index} />
											</div>
											<br />
										</div>
									))}
								</div>
							)}
							<span className={`green-text ImportDataView_browse`} onClick={openFileSelector}>
								BROWSE YOUR PC
							</span>
						</div>
						<button
							className={`btn btn-light-outline`}
							onClick={() => {
								importFiles(selectedFiles);
							}}
						>
							Import File/s &nbsp; <FontAwesomeIcon icon={faArrowUpFromBracket} />
						</button>
					</div>
				</CenterModal>
			)}
		</>
	);
};

export default ImportLocalDataView;
