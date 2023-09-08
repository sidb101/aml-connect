import { useState, useCallback } from "react";
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
	Controls,
	MiniMap,
	Background,
	BackgroundVariant,
} from "reactflow";

import "./Canvas.scss";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import SourceNode from "./SourceNode";
import SinkNode from "./SinkNode";

const initialNodes: Node[] = [
	{ id: "1", type: "source", position: { x: 50, y: 200 }, data: { label: "IN" } },
	{ id: "2", type: "custom", position: { x: 250, y: 100 }, data: { label: "BPF" } },
	{ id: "3", type: "custom", position: { x: 450, y: 200 }, data: { label: "GAIN" } },
	{ id: "4", type: "sink", position: { x: 650, y: 200 }, data: { label: "OUT" } },
];
const initialEdges: Edge[] = [
	{ id: "e1-2", source: "1", target: "2", type: "step" },
	{ id: "e2-3", source: "2", target: "3", type: "step" },
	{ id: "e3-4", source: "3", target: "4", type: "step" },
];

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	animated: false,
};

const nodeTypes: NodeTypes = {
	source: SourceNode,
	custom: CustomNode,
	sink: SinkNode,
};

export default function Canvas() {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => {
			setNodes((nds) => applyNodeChanges(changes, nds));
		},
		[setNodes]
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => {
			setEdges((eds) => applyEdgeChanges(changes, eds));
		},
		[setEdges]
	);
	const onConnect: OnConnect = useCallback(
		(connection) => {
			setEdges((eds) => addEdge(connection, eds));
		},
		[setEdges]
	);

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
				nodeTypes={nodeTypes}
			>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
