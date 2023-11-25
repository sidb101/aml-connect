import type { Edge, Node } from "reactflow";
import { Position } from "reactflow";
import type { EdgeDataT, NetworkMetaDataT, NetworkT, NodeDataT } from "../../redux/slices/ModelCreationSlice";
import type { NetworkVO } from "../../service/RemoteService/client/bindings/NetworkVO";
import { USER_ID } from "../../constants";

const MOCK_NETWORK_ID = 5000;

export const mockNetworkMetaData: NetworkMetaDataT = {
	id: MOCK_NETWORK_ID,
	name: "sample_network",
};

const mockNodes: Array<Node<NodeDataT>> = [
	{
		id: "1",
		type: "networkTerminal",
		data: {
			elementType: "Source",
			label: "Source",
		},
		position: { x: 50, y: 200 },
	},
	{
		id: "2",
		data: {
			elementType: "Filter",
			label: "Filter",
		},
		type: "networkElement",
		position: { x: 250, y: 100 },
	},
	{
		id: "3",
		data: {
			elementType: "Filter",
			label: "Filter",
		},
		type: "networkElement",
		position: { x: 450, y: 200 },
	},
	{
		id: "4",
		type: "networkTerminal",
		data: {
			elementType: "Sink",
			label: "Sink",
		},
		position: { x: 650, y: 200 },
	},
];

const mockEdges: Array<Edge<EdgeDataT>> = [
	{
		id: "edge__1-2",
		source: "1",
		target: "2",
		sourceHandle: "handle__1-net",
		data: { sourceTerminalType: "net", targetTerminalType: "input" },
	},
	{
		id: "edge__2-3",
		source: "2",
		target: "3",
		sourceHandle: "handle__2-output",
		data: { sourceTerminalType: "output", targetTerminalType: "input" },
	},
	{
		id: "edge__3-4",
		source: "3",
		target: "4",
		sourceHandle: "handle__3-output",
		data: { sourceTerminalType: "output", targetTerminalType: "net" },
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
	creator_id: USER_ID,
	elements: [
		{
			id: "1",
			name: "Source",
			parent_network_id: MOCK_NETWORK_ID,
			type_name: "Terminal",
			position: { x: 50, y: 200 },
			terminals: [
				{
					id: "1|edge__1-2",
					parent_element_id: "1",
					type_name: "net",
					node_name: "edge__1-2",
				},
			],
			element_type_params: {
				Terminal: {
					is_input: "true",
					is_output: "false",
				},
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
					id: "2|edge__1-2",
					parent_element_id: "2",
					type_name: "input",
					node_name: "edge__1-2",
				},
				{
					id: "2|edge__2-3",
					parent_element_id: "2",
					type_name: "output",
					node_name: "edge__2-3",
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
					id: "3|edge__2-3",
					parent_element_id: "3",
					type_name: "input",
					node_name: "edge__2-3",
				},
				{
					id: "3|edge__3-4", //terminal ID
					parent_element_id: "3",
					type_name: "output",
					node_name: "edge__3-4",
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
					id: "4|edge__3-4",
					parent_element_id: "4",
					type_name: "net",
					node_name: "edge__3-4",
				},
			],
			position: { x: 650, y: 200 },
			element_type_params: {
				Terminal: {
					is_input: "false",
					is_output: "true",
				},
			},
		},
	],
	nodes: [
		{
			id: "edge__1-2",
			name: "edge__1-2",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["1|edge__1-2", "2|edge__1-2"],
		},
		{
			id: "edge__2-3",
			name: "edge__2-3",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["2|edge__2-3", "3|edge__2-3"],
		},
		{
			id: "edge__3-4",
			name: "edge__3-4",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["3|edge__3-4", "4|edge__3-4"],
		},
	],
};

/***** For Demo ****/
export const demoNetworkMetaData: NetworkMetaDataT = {
	id: MOCK_NETWORK_ID,
	name: "demo_network",
};

const demoNodes: Array<Node<NodeDataT>> = [
	{
		id: "1",
		type: "networkTerminal",
		data: {
			elementType: "Source",
			label: "Source",
		},
		position: { x: -192.89334108322325, y: 14.258033289299902 },
	},
	{
		id: "2",
		data: {
			elementType: "PeakDetector",
			label: "PeakDetector",
		},
		type: "networkElement",
		position: { x: -67.1790478203435, y: 15.172102509907518 },
	},
	{
		id: "3",
		data: {
			elementType: "Comparator",
			label: "Comparator",
		},
		type: "networkElement",
		position: { x: 393.3637157199475, y: -9.63277357992078 },
	},
	{
		id: "4",
		data: {
			elementType: "Filter",
			label: "Filter",
		},
		type: "networkElement",
		position: { x: 197.81003540290646, y: 339.5152253632761 },
	},
	{
		id: "5",
		type: "networkTerminal",
		data: {
			elementType: "Sink",
			label: "Sink",
		},
		position: { x: 444.61224834874497, y: 339.3064750330251 },
	},
	{
		id: "6",
		type: "networkTerminal",
		data: {
			elementType: "Sink",
			label: "Sink",
		},
		position: { x: -44.197768031703845, y: 285.0502742404228 },
	},
	{
		id: "7",
		type: "networkTerminal",
		data: {
			elementType: "Sink",
			label: "Sink",
		},
		position: { x: 680.914020607662, y: 14.470509907529788 },
	},
];

const demoEdges: Array<Edge<EdgeDataT>> = [
	{
		id: "edge__1-2",
		source: "1",
		target: "2",
		sourceHandle: "handle__1-net",
		targetHandle: "handle__2-input",
		data: { sourceTerminalType: "net", targetTerminalType: "input" },
	},
	{
		id: "edge__2-3",
		source: "2",
		target: "3",
		sourceHandle: "handle__2-output",
		targetHandle: "handle__3-positive",
		data: { sourceTerminalType: "output", targetTerminalType: "positive" },
	},
	{
		id: "edge__2-6",
		source: "2",
		target: "6",
		sourceHandle: "handle__2-output",
		targetHandle: "handle__6-net",
		data: { sourceTerminalType: "output", targetTerminalType: "net" },
	},
	{
		id: "edge__2-4",
		source: "2",
		target: "4",
		sourceHandle: "handle__2-output",
		targetHandle: "handle__4-input",
		data: { sourceTerminalType: "output", targetTerminalType: "input" },
	},
	{
		id: "edge__3-7",
		source: "3",
		target: "7",
		sourceHandle: "handle__3-output",
		targetHandle: "handle__7-net",
		data: { sourceTerminalType: "output", targetTerminalType: "net" },
	},
	{
		id: "edge__4-3",
		source: "4",
		target: "3",
		sourceHandle: "handle__4-output",
		targetHandle: "handle__3-negative",
		data: { sourceTerminalType: "output", targetTerminalType: "negative" },
	},
	{
		id: "edge__4-5",
		source: "4",
		target: "5",
		sourceHandle: "handle__4-output",
		targetHandle: "handle__5-net",
		data: { sourceTerminalType: "output", targetTerminalType: "net" },
	},
];

const demoParams: Record<string, Record<string, string>> = {
	"1": {
		is_input: "true",
		is_output: "false",
		hardware_pin: "A0",
	},
	"2": {
		atk: "20000",
		dec: "100",
		model_version: "SecondOrder",
	},
	"3": { threshold: "0.09" },
	"4": { characteristic_frequency: "20", filter_type: "lpf1", quality_factor: "2" },
	"5": {
		is_input: "false",
		is_output: "true",
	},
	"6": {
		is_input: "false",
		is_output: "true",
	},
	"7": {
		is_input: "false",
		is_output: "true",
		hardware_pin: "D3",
	},
};

export const demoNetwork: NetworkT = {
	metaData: demoNetworkMetaData,
	nodes: demoNodes,
	edges: demoEdges,
	params: demoParams,
};
