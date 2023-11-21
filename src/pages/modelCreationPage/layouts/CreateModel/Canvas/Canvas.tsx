import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
	Background,
	BackgroundVariant,
	type Connection,
	ConnectionLineType,
	Controls,
	type DefaultEdgeOptions,
	type Edge,
	type EdgeChange,
	type FitViewOptions,
	type Node,
	type NodeChange,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
	Position,
	useOnSelectionChange,
} from "reactflow";

import "reactflow/dist/style.css";
import "./Canvas.scss";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import {
	type ElementT,
	modelCreationActions,
	type NodeDataT,
	selectAllElements,
	selectCurrentNetwork,
} from "../../../../../redux/slices/ModelCreationSlice";
import Toolbar from "../Toolbar/Toolbar";

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: "step",
};

type CanvasProps = {
	onElementDoubleClick: (node: Node<NodeDataT>) => void;
	onSimulate: () => void;
};
export default function Canvas({ onElementDoubleClick, onSimulate }: CanvasProps) {
	const dispatch = useAppDispatch();
	const currentNetwork = useAppSelector(selectCurrentNetwork);
	const allElements = useAppSelector(selectAllElements);

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
		(element: ElementT) => {
			const label = element.typeName;
			let newNode: Node<NodeDataT>;

			if (label === "Source") {
				newNode = {
					id: newNodeId(),
					sourcePosition: Position.Right,
					type: "input",
					data: { label: label, elementType: "Source" },
					position: newNodePosition(),
					className: "Canvas_input",
				};
			} else if (label === "Sink") {
				newNode = {
					id: newNodeId(),
					targetPosition: Position.Left,
					type: "output",
					data: { label: label, elementType: "Sink" },
					position: newNodePosition(),
					className: "Canvas_output",
				};
			} else {
				newNode = {
					id: newNodeId(),
					sourcePosition: Position.Right,
					targetPosition: Position.Left,
					data: { label: label, elementType: label },
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
			y: currentNodes[currentNodes.length - 1].position.y + 2,
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
				deleteKeyCode={["Backspace", "Delete"]}
				onConnect={onConnect}
				fitView
				fitViewOptions={fitViewOptions}
				defaultEdgeOptions={defaultEdgeOptions}
				connectionLineType={ConnectionLineType.Step}
				onNodeDoubleClick={(e: React.MouseEvent, node: Node<NodeDataT>) => {
					onElementDoubleClick(node);
				}}
			>
				<Toolbar
					allElements={Object.values(allElements)}
					handleAddElement={onAdd}
					handleSimulate={onSimulate}
				/>
				<Controls className={`Canvas_controls`} />
				{/* <MiniMap /> */}
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
