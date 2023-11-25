import "./RunSimulationView.scss";

import DisplayPanel from "../../../../components/displayPanel/DisplayPanel";
import type { InputFileDataT, InputFileMetaDataT } from "../../../../redux/slices/DataHubSlice";
import { useEffect, useState } from "react";
import type { SimulationResultT } from "../../../../redux/slices/ResultSlice";

type RunSimulationViewProps = {
	audioFiles: InputFileDataT[];
	onSimulate: (selectedFile: InputFileMetaDataT) => void;
	onInputFileChange: (selectedFile: InputFileMetaDataT) => void;
	simulationResult: SimulationResultT;
};

function RunSimulationView({ audioFiles, onSimulate, onInputFileChange, simulationResult }: RunSimulationViewProps) {
	const [selectedFile, setSelectedFile] = useState<InputFileDataT | undefined>(
		audioFiles.length <= 0 ? undefined : audioFiles[0]
	);

	useEffect(() => {
		setSelectedFile(audioFiles.length <= 0 ? undefined : audioFiles[0]);
	}, [audioFiles]);

	const onFileSelect = (fileName: string) => {
		const selectedFile = audioFiles.find((file) => file.metadata.name === fileName);
		setSelectedFile(selectedFile);
		if (selectedFile) {
			onInputFileChange(selectedFile.metadata);
		}
	};

	const onSimulateClick = () => {
		selectedFile ? onSimulate(selectedFile.metadata) : console.log("No Valid File to Simulate");
	};

	return (
		<div className={`RunSimulationView_container`}>
			<DisplayPanel>
				<div className={`RunSimulationView_inputContainer`}>
					<div className={`RunSimulationView_audioFileContainer`}>
						<span className={`green-text regular-text`}>Choose Audio File: </span>
						<span className={`RunSimulationView_selectInputContainer`}>
							<select
								disabled={!selectedFile}
								className={`RunSimulationView_selectInput`}
								onChange={(event) => {
									onFileSelect(event.target.value);
								}}
								style={{ cursor: selectedFile ? "default" : "not-allowed" }}
							>
								{selectedFile ? (
									audioFiles.map((audioFile, index) => (
										<option key={index} value={audioFile.metadata.name}>
											{audioFile.metadata.name}
										</option>
									))
								) : (
									<option> No Input Files Uploaded </option>
								)}
							</select>
						</span>
					</div>
					<div className={`RunSimulationView_btnContainer`}>
						<button className={`btn btn-solid`} onClick={onSimulateClick}>
							Run Simulation
						</button>
					</div>
				</div>
				{simulationResult.ranSimulation && (
					<div className={`RunSimulationView_outputContainer`}>
						<img src={simulationResult.vizFile.dataUrl} width="50%" />
					</div>
				)}
			</DisplayPanel>
		</div>
	);
}

export default RunSimulationView;
