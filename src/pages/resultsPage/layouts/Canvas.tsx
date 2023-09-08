import React, { useCallback } from "react";
import ReactFlow, {
	addEdge,
	Background,
	type Connection,
	Controls,
	type Edge,
	MiniMap,
	useEdgesState,
	useNodesState,
} from "reactflow";

import "./Canvas.scss";
import "reactflow/dist/style.css";

const initialNodes = [
	{ id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
	{ id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Canvas() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params: Edge | Connection) => {
			setEdges((eds) => addEdge(params, eds));
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
			>
				<Controls />
				<MiniMap />
				<Background variant="dots" gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
