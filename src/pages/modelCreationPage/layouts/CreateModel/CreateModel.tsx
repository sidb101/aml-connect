import CreateModelView from "./CreateModelView";
import React, { useState } from "react";
import Canvas from "./Canvas/Canvas";
import type { NodeDataT } from "../../../../redux/slices/ModelCreationSlice";
import type { Node } from "reactflow";
import ParameterForm from "./ParameterForm/ParameterForm";

type ModelFormOptions = {
	showForm: boolean;
	selectedNode?: Node<NodeDataT>;
};

const CreateModel = () => {
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

	return (
		<>
			<CreateModelView
				canvas={
					<Canvas
						onElementDoubleClick={(node) => {
							handleElementDoubleClick(node);
						}}
					/>
				}
				showSideForm={formOptions.showForm}
				form={<ParameterForm node={formOptions.selectedNode} />}
			/>
		</>
	);
};

export default CreateModel;
