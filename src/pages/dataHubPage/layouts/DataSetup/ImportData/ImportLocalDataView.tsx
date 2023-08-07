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
import AudioFileTable from "../AudioFileTable";

export type ImportDataViewT = {
	handleFilesImport: (files: InputFileDataT[]) => Promise<void>;
};

const ImportLocalDataView = ({ handleFilesImport }: ImportDataViewT) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [selectedFiles, setSelectedFiles] = useState<InputFileDataT[]>([]);

	//Get the file picker component
	const [openFileSelector] = useFilePicker({
		accept: SUPPORTED_FILE_TYPES,
		readAs: "DataURL",
		onFilesSuccessfulySelected: ({ filesContent }) => {
			const chosenFiles: InputFileDataT[] = filesContent.map((file) => {
				const extension = getFileExtension(file.name);
				return {
					metadata: { name: file.name, extension, mediaType: `audio/${extension}` },
					dataUrl: file.content,
				};
			});
			setSelectedFiles(chosenFiles);
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
	 * Handler when user clicks the import files button in the modal.
	 * @param inputFiles: Selected Files
	 */
	const importFiles = (inputFiles: InputFileDataT[]) => {
		handleFilesImport(inputFiles).catch((e) => console.error(e));
		handleModalClose();
	};

	const [selectedOption, setSelectedOption] = useState("Training Dataset");

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	};

	return (
		<>
			<div className={"ImportDataView_container"}>
				<div className="ImportDataView_dataTypeContainer regular-text grey-text">
					<label>
						<input
							type="radio"
							value="Training Dataset"
							checked={selectedOption === "Training Dataset"}
							onChange={handleOptionChange}
						/>
						Training Dataset
					</label>
					<label>
						<input
							type="radio"
							value="Validation Dataset"
							checked={selectedOption === "Validation Dataset"}
							onChange={handleOptionChange}
						/>
						Validation Dataset
					</label>
					<label>
						<input
							type="radio"
							value="Testing Dataset"
							checked={selectedOption === "Testing Dataset"}
							onChange={handleOptionChange}
						/>
						Testing Dataset
					</label>
				</div>
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
						<div
							className={`ImportDataView_uploadRegion ${
								selectedFiles.length > 0 ? "ImportDataView_uploadRegion___filesPresent" : ""
							}`}
						>
							{selectedFiles.length > 0 && <AudioFileTable files={selectedFiles} />}
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
