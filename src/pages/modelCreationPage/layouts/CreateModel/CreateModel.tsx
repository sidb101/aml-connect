import CreateModelView from "./CreateModelView";
import React, { useState } from "react";
import { useAppSelector } from "../../../../hooks";
import Canvas from "./Canvas/Canvas";
import type { NodeDataT } from "../../../../redux/slices/ModelCreationSlice";
import type { Node } from "reactflow";
import ParameterForm from "./ParameterForm/ParameterForm";
import remoteService from "../../../../service/RemoteService/RemoteService";
import { audioFilesMock } from "../../../../tests/mockdata/audioFilesMock";
import { selectCurrentNetwork } from "../../../../redux/slices/ModelCreationSlice";
import { selectCurrentProjectSlug } from "../../../../redux/slices/ProjectSlice";

type ModelFormOptions = {
	showForm: boolean;
	selectedNode?: Node<NodeDataT>;
};

const CreateModel = () => {
	const projectSlug = useAppSelector(selectCurrentProjectSlug);
	const currentNetwork = useAppSelector(selectCurrentNetwork);

	const [formOptions, setFormOptions] = useState<ModelFormOptions>({
		showForm: false,
	});

	const handleElementDoubleClick = (node: Node<NodeDataT>) => {
		if (!formOptions.selectedNode || formOptions.selectedNode.id !== node.id) {
			setFormOptions((formOptions) => ({
				...formOptions,
				showForm: true,
				selectedNode: node,
			}));
		} else {
			setFormOptions((formOptions) => ({
				...formOptions,
				showForm: !formOptions.showForm,
				selectedNode: node,
			}));
		}
	};

	const simulateNetwork = () => {
		remoteService.simulateNetwork(currentNetwork, audioFilesMock[0].metadata).catch((e) => {
			console.error("Couldn't simulate", e);
		});
	};

	return (
		<>
			<CreateModelView
				canvas={
					<Canvas
						onElementDoubleClick={(node) => {
							handleElementDoubleClick(node);
						}}
						onSimulate={simulateNetwork}
					/>
				}
				showSideForm={formOptions.showForm}
				form={<ParameterForm node={formOptions.selectedNode} onSimulate={simulateNetwork} />}
			/>
		</>
	);
};

export default CreateModel;
