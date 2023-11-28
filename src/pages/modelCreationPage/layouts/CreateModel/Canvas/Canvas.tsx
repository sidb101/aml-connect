import React, { useCallback } from "react";
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
import { newNode } from "./canvasUtils";
import NetworkElement from "./NetworkElement";
import NetworkTerminal from "./NetworkTerminal";

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: "smoothstep",
};

type CanvasProps = {
	onElementDoubleClick: (node: Node<NodeDataT>) => void;
	onSimulate: () => void;
};

const nodeTypes = { networkElement: NetworkElement, networkTerminal: NetworkTerminal };

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
			const nodeToAdd = newNode(currentNetwork, element);
			dispatch(modelCreationActions.addNode({ node: nodeToAdd }));
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
				deleteKeyCode={["Delete"]}
				onConnect={onConnect}
				fitView
				fitViewOptions={fitViewOptions}
				defaultEdgeOptions={defaultEdgeOptions}
				connectionLineType={ConnectionLineType.Step}
				nodeTypes={nodeTypes}
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
