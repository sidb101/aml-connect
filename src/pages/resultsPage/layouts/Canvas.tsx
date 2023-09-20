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
	{ id: "e1-2", source: "1", target: "2" },
	{ id: "e2-3", source: "2", target: "3" },
	{ id: "e3-4", source: "3", target: "4" },
];

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: "step",
};

const nodeTypes: NodeTypes = {
	source: SourceNode,
	custom: CustomNode,
	sink: SinkNode,
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
				nodeTypes={nodeTypes}
				connectionLineType={ConnectionLineType.Step}
			>
				<Panel position={`top-right`}>
					<button onClick={onAdd}>add node</button>
				</Panel>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
