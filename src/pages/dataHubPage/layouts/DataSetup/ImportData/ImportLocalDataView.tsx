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
import { testIds } from "../../../../../tests/test-utils";

export type ImportDataViewT = {
	onClose: () => void;
	onFilesImport: (files: InputFileDataT[]) => Promise<void>;
};

/**
 * Will open the Modal to Browse for Items Locally and allow the user to choose and upload files to the system
 * @param onClose: Method that would be called when View needs to be closed
 * @param onFilesImport: Method that would be called when files are ready to be imported to the project
 */
const ImportLocalDataView = ({ onFilesImport, onClose }: ImportDataViewT) => {
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

	const handleModalClose = () => {
		setSelectedFiles([]);
		onClose();
	};

	/**
	 * Handler when user clicks the import files button in the modal.
	 * @param inputFiles: Selected Files
	 */
	const importFiles = (inputFiles: InputFileDataT[]) => {
		onFilesImport(inputFiles).catch((e) => console.error(e));
		handleModalClose();
	};

	return (
		<>
			<CenterModal
				onClose={handleModalClose}
				closeOnBackdropClick={false}
				headerElement={<div className={`section-subheading-text`}>Import Files</div>}
				modalWidth={"60%"}
				modalHeight={"70%"}
			>
				<div className={`ImportLocalDataView_modalBodyContainer`} data-testid={testIds.importModalBody}>
					<div
						className={`ImportLocalDataView_uploadRegion ${
							selectedFiles.length > 0 ? "ImportLocalDataView_uploadRegion___filesPresent" : ""
						}`}
					>
						{selectedFiles.length > 0 && <AudioFileTable files={selectedFiles} />}
						<span
							className={`green-text ImportLocalDataView_browse`}
							onClick={openFileSelector}
							data-testid={testIds.browsePCLink}
						>
							BROWSE YOUR PC
						</span>
					</div>
					<button
						className={`btn btn-light-outline`}
						onClick={() => {
							importFiles(selectedFiles);
						}}
						data-testid={testIds.modalImportFilesBtn}
					>
						Import File/s &nbsp; <FontAwesomeIcon icon={faArrowUpFromBracket} />
					</button>
				</div>
			</CenterModal>
		</>
	);
};

export default ImportLocalDataView;
