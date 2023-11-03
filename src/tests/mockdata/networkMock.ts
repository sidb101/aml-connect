import type { Edge, Node } from "reactflow";
import { Position } from "reactflow";
import type { EdgeDataT, NetworkMetaDataT, NetworkT, NodeDataT } from "../../redux/slices/ModelCreationSlice";
import type { NetworkVO } from "../../service/RemoteService/client/bindings/NetworkVO";
import { USER_ID } from "../../constants";

const MOCK_NETWORK_ID = BigInt(5000);

export const mockNetworkMetaData: NetworkMetaDataT = {
	id: Number(MOCK_NETWORK_ID),
	name: "sample_network",
};

const mockNodes: Array<Node<NodeDataT>> = [
	{
		id: "1",
		sourcePosition: Position.Right,
		type: "input",
		data: {
			elementType: "Source",
			label: "Source",
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
			label: "Filter",
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
			label: "Filter",
		},
		position: { x: 450, y: 200 },
		className: "Canvas_node",
	},
	{
		id: "4",
		targetPosition: Position.Left,
		type: "output",
		data: {
			elementType: "Sink",
			label: "Sink",
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
	"1": {
		is_input: "true",
		is_output: "false",
	},
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
	"4": {
		is_input: "false",
		is_output: "true",
	},
};

export const mockNetwork: NetworkT = {
	metaData: mockNetworkMetaData,
	nodes: mockNodes,
	edges: mockEdges,
	params: mockParams,
};

/**** Expected Transformation ***/
export const mockExpectedNetworkTransform: NetworkVO = {
	id: MOCK_NETWORK_ID,
	name: "sample_network",
	creator_id: BigInt(USER_ID),
	elements: [
		{
			id: "1",
			name: "Source",
			parent_network_id: MOCK_NETWORK_ID,
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
				Terminal: {},
			},
		},
		{
			id: "2",
			name: "Filter",
			parent_network_id: MOCK_NETWORK_ID,
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
			name: "Filter",
			parent_network_id: MOCK_NETWORK_ID,
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
			name: "Sink",
			parent_network_id: MOCK_NETWORK_ID,
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
				Terminal: {},
			},
		},
	],
	nodes: [
		{
			id: "reactflow__edge-1-2",
			name: "reactflow__edge-1-2",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["1|reactflow__edge-1-2", "2|reactflow__edge-1-2"],
		},
		{
			id: "reactflow__edge-2-3",
			name: "reactflow__edge-2-3",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["2|reactflow__edge-2-3", "3|reactflow__edge-2-3"],
		},
		{
			id: "reactflow__edge-3-4",
			name: "reactflow__edge-3-4",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["3|reactflow__edge-3-4", "4|reactflow__edge-3-4"],
		},
	],
};
