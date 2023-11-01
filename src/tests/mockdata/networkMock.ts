import type { Edge, Node } from "reactflow";
import { Position } from "reactflow";
import type { EdgeDataT, NetworkMetaDataT, NetworkT, NodeDataT } from "../../redux/slices/ModelCreationSlice";
import type { Network } from "../../service/RemoteService/client/bindings/Network";
import type { TerminalParams } from "../../service/RemoteService/client/bindings/TerminalParams";
import type { OptionT } from "../../components/dropdown/Dropdown";

// TODO: Remove this and use all elements fetched from backend 'ElementT'
export const allNodes: OptionT[] = [
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

export const mockNetworkMetaData: NetworkMetaDataT = {
	id: 5000n,
	name: "sample_network",
};

const mockNodes: Array<Node<NodeDataT>> = [
	{
		id: "1",
		sourcePosition: Position.Right,
		type: "input",
		data: {
			elementType: "Terminal",
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
			label: "HPF2",
		},
		position: { x: 250, y: 100 },
		className: "Canvas_node",
	},
	{
		id: "3",
		sourcePosition: Position.Right,
		targetPosition: Position.Left,
		data: {
			elementType: "Filter",
			label: "LPF2",
		},
		position: { x: 450, y: 200 },
		className: "Canvas_node",
	},
	{
		id: "4",
		targetPosition: Position.Left,
		type: "output",
		data: {
			elementType: "Terminal",
			label: "OUT",
		},
		position: { x: 650, y: 200 },
		className: "Canvas_output",
	},
];

const mockEdges: Array<Edge<EdgeDataT>> = [
	{
		id: "reactflow__edge-1-2",
		source: "1",
		target: "2",
		data: { sourceTerminalType: "input", targetTerminalType: "input" },
	},
	{
		id: "reactflow__edge-2-3",
		source: "2",
		target: "3",
		data: { sourceTerminalType: "output", targetTerminalType: "input" },
	},
	{
		id: "reactflow__edge-3-4",
		source: "3",
		target: "4",
		data: { sourceTerminalType: "output", targetTerminalType: "output" },
	},
];

const mockParams: Record<string, Record<string, string>> = {
	"2": {
		characteristic_frequency: "1000",
		quality_factor: "2",
		filter_type: "hpf2",
	},
	"3": {
		characteristic_frequency: "10",
		quality_factor: "1",
		filter_type: "lpf2",
	},
};

export const mockNetwork: NetworkT = {
	metaData: mockNetworkMetaData,
	nodes: mockNodes,
	edges: mockEdges,
	params: mockParams,
};

/**** Expected Transformation ***/
export const mockExpectedNetworkTransform: Network = {
	id: 5000n,
	name: "sample_network",
	creator_id: 1n,
	elements: [
		{
			id: "1",
			name: "IN",
			parent_network_id: 5000n,
			type_name: "Terminal",
			position: { x: 50, y: 200 },
			terminals: [
				{
					id: "1|reactflow__edge-1-2",
					parent_element_id: "1",
					type_name: "input",
					node_name: "reactflow__edge-1-2",
				},
			],
			element_type_params: {
				Terminal: undefined as unknown as TerminalParams,
			},
		},
		{
			id: "2",
			name: "HPF2",
			parent_network_id: 5000n,
			type_name: "Filter",
			element_type_params: {
				Filter: {
					characteristic_frequency: "1000",
					quality_factor: "2",
					filter_type: "hpf2",
				},
			},
			position: { x: 250, y: 100 },
			terminals: [
				{
					id: "2|reactflow__edge-1-2",
					parent_element_id: "2",
					type_name: "input",
					node_name: "reactflow__edge-1-2",
				},
				{
					id: "2|reactflow__edge-2-3",
					parent_element_id: "2",
					type_name: "output",
					node_name: "reactflow__edge-2-3",
				},
			],
		},
		{
			id: "3",
			name: "LPF2",
			parent_network_id: 5000n,
			type_name: "Filter",
			terminals: [
				{
					id: "3|reactflow__edge-2-3",
					parent_element_id: "3",
					type_name: "input",
					node_name: "reactflow__edge-2-3",
				},
				{
					id: "3|reactflow__edge-3-4", //terminal ID
					parent_element_id: "3",
					type_name: "output",
					node_name: "reactflow__edge-3-4",
				},
			],
			position: { x: 450, y: 200 },
			element_type_params: {
				Filter: {
					characteristic_frequency: "10",
					quality_factor: "1",
					filter_type: "lpf2",
				},
			},
		},
		{
			id: "4",
			name: "OUT",
			parent_network_id: 5000n,
			type_name: "Terminal",
			terminals: [
				{
					id: "4|reactflow__edge-3-4",
					parent_element_id: "4",
					type_name: "output",
					node_name: "reactflow__edge-3-4",
				},
			],
			position: { x: 650, y: 200 },
			element_type_params: {
				Terminal: undefined as unknown as TerminalParams,
			},
		},
	],
	nodes: [
		{
			id: "reactflow__edge-1-2",
			name: "reactflow__edge-1-2",
			parent_network_id: 5000n,
			terminal_ids: ["1|reactflow__edge-1-2", "2|reactflow__edge-1-2"],
		},
		{
			id: "reactflow__edge-2-3",
			name: "reactflow__edge-2-3",
			parent_network_id: 5000n,
			terminal_ids: ["2|reactflow__edge-2-3", "3|reactflow__edge-2-3"],
		},
		{
			id: "reactflow__edge-3-4",
			name: "reactflow__edge-3-4",
			parent_network_id: 5000n,
			terminal_ids: ["3|reactflow__edge-3-4", "4|reactflow__edge-3-4"],
		},
	],
};
