import "./RunSimulationView.scss";

import DisplayPanel from "../../../../components/displayPanel/DisplayPanel";
import type { InputFileDataT, InputFileMetaDataT } from "../../../../redux/slices/DataHubSlice";
import { useEffect, useState } from "react";
import type { SimulationResultT } from "../../../../redux/slices/ResultSlice";
import CodeBlockView from "./CodeBlockView";
import { PYTHON_LANG } from "../../../../constants";

type RunSimulationViewProps = {
	audioFiles: InputFileDataT[];
	onSimulate: (selectedFile: InputFileMetaDataT) => void;
	onInputFileChange: (selectedFile: InputFileMetaDataT) => void;
	simulationResult: SimulationResultT;
};

function RunSimulationView({ audioFiles, onSimulate, onInputFileChange, simulationResult }: RunSimulationViewProps) {
	const [selectedFile, setSelectedFile] = useState<InputFileDataT | undefined>();

	useEffect(() => {
		if (!selectedFile) {
			setSelectedFile(audioFiles.length <= 0 ? undefined : audioFiles[0]);
		}
	}, [audioFiles, selectedFile]);

	const onFileSelect = (fileName: string) => {
		const selectedFile = audioFiles.find((file) => file.metadata.name === fileName);
		if (selectedFile) {
			onInputFileChange(selectedFile.metadata);
		}
		setSelectedFile(selectedFile);
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
								value={selectedFile?.metadata.name}
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
						<div className={`RunSimulationView_imageContainer`}>
							<div className={`green-text section-heading-text RunSimulationView_imageTitle`}>
								Simulation Response
							</div>
							<img src={simulationResult.vizFile.dataUrl} width={"100%"} />
						</div>
						<div className={`RunSimulationView_codeContainer`}>
							<div className={`green-text section-heading-text RunSimulationView_codeTitle`}>
								Generated Source Code
							</div>
							<CodeBlockView codeFile={simulationResult.codeFile} codeLanguage={PYTHON_LANG} />
						</div>
					</div>
				)}
			</DisplayPanel>
		</div>
	);
}

export default RunSimulationView;
