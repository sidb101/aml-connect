import { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
	addEdge,
	type FitViewOptions,
	applyNodeChanges,
	applyEdgeChanges,
	type Node,
	type Edge,
	type OnNodesChange,
	type OnEdgesChange,
	type OnConnect,
	type NodeTypes,
	type DefaultEdgeOptions,
	type NodeChange,
	type EdgeChange,
	type Connection,
	Controls,
	MiniMap,
	Background,
	BackgroundVariant,
	Panel,
	ConnectionLineType,
	type ReactFlowInstance,
	ControlButton,
} from "reactflow";

import "reactflow/dist/style.css";
import "./Canvas.scss";
import { initialEdges, initialNodes } from "../../../../../tests/mockdata/allNodesAndEdges";

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: "step",
};

export default function Canvas() {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);

	const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
		setNodes((nodes: Node[]) => applyNodeChanges(changes, nodes));
	}, []);

	const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
		setEdges((edges: Edge[]) => applyEdgeChanges(changes, edges));
	}, []);

	const onConnect: OnConnect = useCallback((connection: Connection) => {
		setEdges((edges: Edge[]) => addEdge(connection, edges));
	}, []);

	const onAdd = useCallback(() => {
		const newNode = (nodes: Node[]) => {
			return {
				id: String(nodes.length + 1),
				type: "custom",
				position: {
					x: nodes[nodes.length - 1].position.x - 25,
					y: nodes[nodes.length - 1].position.y + 25,
				},
				data: { label: "Added node" },
			};
		};

		setNodes((nodes: Node[]) => nodes.concat(newNode(nodes)));
	}, []);

	return (
		<div className={`Canvas_container`}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
				fitViewOptions={fitViewOptions}
				defaultEdgeOptions={defaultEdgeOptions}
				connectionLineType={ConnectionLineType.Step}
			>
				{/*<Panel position={`top-right`}>*/}
				{/*	<button onClick={onAdd}>add node</button>*/}
				{/*</Panel>*/}
				<Controls className={`Canvas_controls`}>
					<ControlButton className={`Canvas_controlButton`} onClick={onAdd}>
						<div title={"My Tooltip"}>1</div>
					</ControlButton>
				</Controls>
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
