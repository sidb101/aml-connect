import CreateModelView from "./CreateModelView";
import { type ModelCreationPageContextT, useModelCreationContext } from "../../ModelCreationPage";
import React, { useEffect, useState } from "react";
import { dataVizRoute, neuralNetworkRoute } from "../../../../routes";
import { useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/GeneralSlice";
import Canvas from "./Canvas/Canvas";
import type { NodeDataT } from "../../../../redux/slices/ModelCreationSlice";
import type { Node } from "reactflow";
import ParameterForm from "./ParameterForm/ParameterForm";
import remoteService from "../../../../service/RemoteService/RemoteService";
import { audioFilesMock } from "../../../../tests/mockdata/audioFilesMock";
import { selectCurrentNetwork } from "../../../../redux/slices/ModelCreationSlice";

type ModelFormOptions = {
	showForm: boolean;
	selectedNode?: Node<NodeDataT>;
};

const CreateModel = () => {
	const { setHeading, setFooter }: ModelCreationPageContextT = useModelCreationContext();
	const projectSlug = useAppSelector(selectCurrentProjectSlug);
	const currentNetwork = useAppSelector(selectCurrentNetwork);

	const [formOptions, setFormOptions] = useState<ModelFormOptions>({
		showForm: false,
	});

	//Change the headers and footers of Model Creation as per the current view
	useEffect(() => {
		setHeading("Create Model");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
			nextBtn: { label: "Neural Networks", route: neuralNetworkRoute(projectSlug) },
		}));
	}, [projectSlug]);

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
