import "./ImportLocalDataView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import { useState } from "react";
import CenterModal from "../../../../../components/modal/CenterModal";
import { type FileContent, useFilePicker } from "use-file-picker";
import ReactPlayer from "react-player";
import { SUPPORTED_FILE_TYPES } from "../../../../../constants";

export type ImportDataFileT = {
	name: string;
	dataUrl: string;
};
export type ImportDataViewT = {
	handleFilesImport: (files: ImportDataFileT[]) => Promise<void>;
	handleFilesImportError?: (error: Error) => void;
};

const ImportLocalDataView = ({ handleFilesImport, handleFilesImportError }: ImportDataViewT) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [playingIndex, setPlayingIndex] = useState<number>(-1);

	//Get the file picker component
	const [openFileSelector, { filesContent }] = useFilePicker({
		accept: SUPPORTED_FILE_TYPES,
		readAs: "DataURL",
		onFilesSuccessfulySelected: ({ plainFiles, filesContent }) => {
			plainFiles.forEach((file) => console.log(file));
		},
	});

	const handleModalToggle = () => {
		setModalOpen((s) => !s);
	};

	/**
	 * Method to play and pause any particular file
	 * @param index
	 */
	const handlePlayToggle = (index: number) => {
		index == playingIndex ? setPlayingIndex(-1) : setPlayingIndex(index);
	};

	/**
	 * Method to be called when user clicks the import files button in the modal.
	 * @param files: Selected Files
	 */
	const importFiles = (files: FileContent[]) => {
		const chosenFiles: ImportDataFileT[] = files.map((file) => ({
			name: file.name,
			dataUrl: file.content,
		}));

		handleFilesImport(chosenFiles).catch((e) =>
			handleFilesImportError ? handleFilesImportError(e) : console.error(e)
		);
	};

	return (
		<>
			<div className={"ImportDataView_container"}>
				<div className={`ImportDataView_dataTypeContainer`}>Type of Data</div>
				<div className={`ImportDataView_btnContainer`}>
					<button className={`btn btn-light-outline ImportDataView_btn`} onClick={handleModalToggle}>
						Import Files &nbsp; <FontAwesomeIcon icon={faArrowUpFromBracket} />
					</button>
					<div className={`light-grey-text small-text ImportDataView_btnHint`}>WAV format supported only</div>
				</div>
			</div>
			{modalOpen && (
				<CenterModal
					onClose={handleModalToggle}
					closeOnBackdropClick={false}
					headerElement={<div className={`section-subheading-text`}>Import Files</div>}
					modalWidth={"60%"}
					modalHeight={"70%"}
				>
					<div className={`ImportDataView_modalBodyContainer`}>
						<div className={`ImportDataView_uploadRegion`}>
							{filesContent.length > 0 && (
								<div style={{ marginBottom: "20px" }}>
									{filesContent.map((file, index) => (
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
								importFiles(filesContent);
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
