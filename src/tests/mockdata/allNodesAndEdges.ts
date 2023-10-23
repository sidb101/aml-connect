import type { Edge, Node } from "reactflow";
import { Position } from "reactflow";
import type { EdgeDataT, NetworkMetaDataT, NetworkT, NodeDataT } from "../../redux/slices/ModelCreationSlice";

export type OptionT = {
	label: string;
	menuLabel: string;
};
export const testNetworkMetaData: NetworkMetaDataT = {
	id: 1n,
	name: "Test Network",
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

export const testNodes: Array<Node<NodeDataT>> = [
	{
		id: "1",
		sourcePosition: Position.Right,
		type: "input",
		data: {
			elementType: "in",
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
			elementType: "Filter",
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
			elementType: "GainOpAmp",
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
			elementType: "our",
			label: "OUT",
		},
		position: { x: 650, y: 200 },
		className: "Canvas_output",
	},
];

export const testEdges: Array<Edge<EdgeDataT>> = [
	{ id: "e1-2", source: "1", target: "2" },
	{ id: "e2-3", source: "2", target: "3" },
	{ id: "e3-4", source: "3", target: "4" },
];

export const testNetwork: NetworkT = {
	metaData: testNetworkMetaData,
	nodes: testNodes,
	edges: testEdges,
	params: {},
};
