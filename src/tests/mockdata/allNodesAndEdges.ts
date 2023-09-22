import type { Edge, Node } from "reactflow";

export const initialNodes: Node[] = [
	{ id: "1", type: "source", position: { x: 50, y: 200 }, data: { label: "IN" } },
	{ id: "2", type: "custom", position: { x: 250, y: 100 }, data: { label: "BPF" } },
	{ id: "3", type: "custom", position: { x: 450, y: 200 }, data: { label: "GAIN" } },
	{ id: "4", type: "sink", position: { x: 650, y: 200 }, data: { label: "OUT" } },
];

export const initialEdges: Edge[] = [
	{ id: "e1-2", source: "1", target: "2" },
	{ id: "e2-3", source: "2", target: "3" },
	{ id: "e3-4", source: "3", target: "4" },
];
