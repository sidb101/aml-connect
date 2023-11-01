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
	type Node,
	type NodeChange,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
	Position,
} from "reactflow";

import "reactflow/dist/style.css";
import "./Canvas.scss";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import {
	modelCreationActions,
	type NodeDataT,
	selectAllElements,
	selectCurrentNetwork,
} from "../../../../../redux/slices/ModelCreationSlice";
import Toolbar from "../components/Toolbar";

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: "step",
};

export default function Canvas() {
	const dispatch = useAppDispatch();
	const currentNetwork = useAppSelector(selectCurrentNetwork);
	const allElements = useAppSelector(selectAllElements);

	console.log(currentNetwork.nodes);
	console.log(currentNetwork.edges);

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
					id: newNodeId(),
					sourcePosition: Position.Right,
					type: "input",
					data: { label: label, elementType: "in" },
					position: newNodePosition(),
					className: "Canvas_input",
				};
			} else if (label === "OUT") {
				newNode = {
					id: newNodeId(),
					targetPosition: Position.Left,
					type: "output",
					data: { label: label, elementType: "out" },
					position: newNodePosition(),
					className: "Canvas_output",
				};
			} else {
				newNode = {
					id: newNodeId(),
					sourcePosition: Position.Right,
					targetPosition: Position.Left,
					data: { label: label, elementType: label.toLowerCase() },
					position: newNodePosition(),
					className: "Canvas_node",
				};
			}

			dispatch(modelCreationActions.addNode({ node: newNode }));
		},
		[currentNetwork.nodes]
	);

	const newNodePosition = () => {
		const currentNodes: Array<Node<NodeDataT>> = currentNetwork.nodes;
		return {
			x: currentNodes[currentNodes.length - 1].position.x - 25,
			y: currentNodes[currentNodes.length - 1].position.y + 25,
		};
	};

	const newNodeId = () => {
		return String(currentNetwork.nodes.length + 1);
	};

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
			>
				<Toolbar allElements={Object.values(allElements)} handleAddElement={onAdd} />
				<Controls className={`Canvas_controls`} />
				{/* <MiniMap /> */}
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
