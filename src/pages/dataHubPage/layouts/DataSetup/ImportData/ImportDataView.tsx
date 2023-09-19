import "./ImportDataView.scss";
import { testIds } from "../../../../../tests/test-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import React, { useState } from "react";
import { DataSetT } from "../../../../../redux/slices/DataHubSlice";

export type ImportDataViewT = {
	dataType: string;
	onDataTypeChange: (dataType: DataSetT) => void;
	onLocalImport: () => void;
};

/**
 * It will render the radio buttons for type of data, and also take in click handlers of the data sources as the prop
 * and call the handlers as per user click.
 */
const ImportDataView = ({ dataType, onLocalImport, onDataTypeChange }: ImportDataViewT) => {
	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onDataTypeChange(event.target.value as DataSetT);
	};

	return (
		<div className={"ImportDataView_container"}>
			<div className="ImportDataView_dataTypeContainer regular-text grey-text">
				<label>
					<input
						type="radio"
						value={DataSetT.TRAINING}
						checked={dataType === DataSetT.TRAINING}
						onChange={handleOptionChange}
					/>
					Training Dataset
				</label>
				<label>
					<input
						type="radio"
						value={DataSetT.VALIDATION}
						checked={dataType === DataSetT.VALIDATION}
						onChange={handleOptionChange}
					/>
					Validation Dataset
				</label>
				<label>
					<input
						type="radio"
						value={DataSetT.TESTING}
						checked={dataType === DataSetT.TESTING}
						onChange={handleOptionChange}
					/>
					Testing Dataset
				</label>
			</div>

			{/*Different kinds of Data Source Buttons*/}
			<div className={`ImportDataView_btnContainer`}>
				<button
					className={`btn btn-light-outline ImportDataView_btn`}
					onClick={onLocalImport}
					data-testid={testIds.importFilesBtn}
				>
					Import Files &nbsp; <FontAwesomeIcon icon={faArrowUpFromBracket} />
				</button>
				<div className={`light-grey-text small-text ImportDataView_btnHint`}>WAV format supported only</div>
			</div>
		</div>
	);
};

export default ImportDataView;
