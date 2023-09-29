import type { Edge, Node } from "reactflow";
import { Position } from "reactflow";

export type OptionT = {
	label: string;
	menuLabel: string;
};

export const nodeOptions: OptionT[] = [
	{
		label: "IN",
		menuLabel: "Input",
	},
	{
		label: "BPF",
		menuLabel: "Band Pass Filter",
	},
	{
		label: "GAIN",
		menuLabel: "Gain",
	},
	{
		label: "OUT",
		menuLabel: "Output",
	},
];

export const initialNodes: Node[] = [
	{
		id: "1",
		sourcePosition: Position.Right,
		type: "input",
		data: {
			label: "IN",
		},
		position: { x: 50, y: 200 },
		className: "Canvas_input",
	},
	{
		id: "2",
		sourcePosition: Position.Right,
		targetPosition: Position.Left,
		data: {
			label: "BPF",
		},
		position: { x: 250, y: 100 },
		className: "Canvas_node",
	},
	{
		id: "3",
		sourcePosition: Position.Right,
		targetPosition: Position.Left,
		data: {
			label: "GAIN",
		},
		position: { x: 450, y: 200 },
		className: "Canvas_node",
	},
	{
		id: "4",
		targetPosition: Position.Left,
		type: "output",
		data: {
			label: "OUT",
		},
		position: { x: 650, y: 200 },
		className: "Canvas_output",
	},
];

export const initialEdges: Edge[] = [
	{ id: "e1-2", source: "1", target: "2" },
	{ id: "e2-3", source: "2", target: "3" },
	{ id: "e3-4", source: "3", target: "4" },
];
