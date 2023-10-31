import { useCallback, useState } from "react";
import ReactFlow, {
	Background,
	BackgroundVariant,
	type Connection,
	ConnectionLineType,
	Controls,
	type DefaultEdgeOptions,
	type EdgeChange,
	type FitViewOptions,
	MiniMap,
	type Node,
	type NodeChange,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
	Position,
} from "reactflow";

import "reactflow/dist/style.css";
import "./Canvas.scss";
import { nodeOptions, type OptionT } from "../../../../../tests/mockdata/allNodesAndEdges";
import Dropdown from "../../../../../components/dropdown/Dropdown";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import {
	modelCreationActions,
	type NodeDataT,
	selectAllElements,
	selectCurrentNetwork,
} from "../../../../../redux/slices/ModelCreationSlice";

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: "step",
};

export default function Canvas() {
	const [showDropdown, setShowDropdown] = useState(false);

	// Define the options for the dropdown.
	const options = nodeOptions;

	const dispatch = useAppDispatch();
	const currentNetwork = useAppSelector(selectCurrentNetwork);
	const allElements = useAppSelector(selectAllElements);

	// Handle the click event of the dropdown option.
	const handleOptionClick = (option: OptionT) => {
		onAdd(option.label);
		setShowDropdown(false); // close the dropdown when an option is clicked
	};

	const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
		dispatch(modelCreationActions.updateNodes({ nodeChanges: changes }));
	}, []);

	const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
		dispatch(modelCreationActions.updateEdges({ edgeChanges: changes }));
	}, []);

	const onConnect: OnConnect = useCallback((connection: Connection) => {
		dispatch(modelCreationActions.connectNodes({ connection: connection }));
	}, []);

	const onAdd = useCallback(
		(label: string) => {
			const currentNodes: Array<Node<NodeDataT>> = currentNetwork.nodes;
			let newNode: Node<NodeDataT>;

			if (label === "IN") {
				newNode = {
					id: String(currentNodes.length + 1),
					sourcePosition: Position.Right,
					type: "input",
					data: { label: label, elementType: "in" },
					position: {
						x: currentNodes[currentNodes.length - 1].position.x - 25,
						y: currentNodes[currentNodes.length - 1].position.y + 25,
					},
					className: "Canvas_input",
				};
			} else if (label === "OUT") {
				newNode = {
					id: String(currentNodes.length + 1),
					targetPosition: Position.Left,
					type: "output",
					data: { label: label, elementType: "out" },
					position: {
						x: currentNodes[currentNodes.length - 1].position.x - 25,
						y: currentNodes[currentNodes.length - 1].position.y + 25,
					},
					className: "Canvas_output",
				};
			} else {
				newNode = {
					id: String(currentNodes.length + 1),
					sourcePosition: Position.Right,
					targetPosition: Position.Left,
					data: { label: label, elementType: label.toLowerCase() },
					position: {
						x: currentNodes[currentNodes.length - 1].position.x - 25,
						y: currentNodes[currentNodes.length - 1].position.y + 25,
					},
					className: "Canvas_node",
				};
			}

			dispatch(modelCreationActions.addNode({ node: newNode }));
		},
		[currentNetwork.nodes]
	);

	return (
		<div className={`Canvas_container`}>
			<ReactFlow
				nodes={currentNetwork.nodes}
				edges={currentNetwork.edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
				fitViewOptions={fitViewOptions}
				defaultEdgeOptions={defaultEdgeOptions}
				connectionLineType={ConnectionLineType.Step}
				onPaneClick={() => {
					setShowDropdown(false);
				}}
			>
				<div className={`Canvas_allMenuContainer`}>
					<div className={`Canvas_sideMenuContainer`}>
						<div className={`Canvas_sideMenuBtnContainer`}>
							<button
								onClick={() => {
									setShowDropdown((s) => !s);
								}}
							>
								+
							</button>
						</div>
					</div>
					<div className={`Canvas_sideMenuContainer`}>
						<div className={`Canvas_sideMenuNodeMenuContainer`}>
							{showDropdown && (
								<Dropdown
									options={options}
									onOptionClick={handleOptionClick}
									onClose={() => {
										setShowDropdown(false);
									}}
								/>
							)}
						</div>
					</div>
				</div>
				<Controls className={`Canvas_controls`}></Controls>
				{/* <MiniMap /> */}
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
