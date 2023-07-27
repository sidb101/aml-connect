import "./ImportDataView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import { useState } from "react";
import CenterModal from "../../../../../components/modal/CenterModal";

export type ImportDataViewT = {
	data?: string;
};

const ImportDataView = (props: ImportDataViewT) => {
	const [toUpload, setToUpload] = useState<boolean>(false);

	//Get the file picker component

	const toggleUpload = () => {
		setToUpload((s) => !s);
	};

	return (
		<>
			<div className={"ImportDataView_container"}>
				<div className={`ImportDataView_dataTypeContainer`}>Type of Data</div>
				<div className={`ImportDataView_btnContainer`}>
					<button className={`btn btn-light-outline ImportDataView_btn`} onClick={toggleUpload}>
						Import Files &nbsp; <FontAwesomeIcon icon={faArrowUpFromBracket} />
					</button>
					<div className={`light-grey-text small-text ImportDataView_btnHint`}>WAV format supported only</div>
				</div>
			</div>
			{toUpload && (
				<CenterModal
					onClose={toggleUpload}
					closeOnBackdropClick={false}
					headerElement={<div className={`section-subheading-text`}>Import Files</div>}
					modalWidth={"35%"}
					modalHeight={"40%"}
				>
					<div className={`ImportDataView_modalBodyContainer`}>
						<div className={`ImportDataView_uploadRegion`}>
							<span className={`green-text ImportDataView_browse`}>BROWSE YOUR PC</span>
						</div>
						<button className={`btn btn-light-outline`}>
							Import File/s &nbsp; <FontAwesomeIcon icon={faArrowUpFromBracket} />
						</button>
					</div>
				</CenterModal>
			)}
		</>
	);
};

export default ImportDataView;
