import type { Edge, Node } from "reactflow";
import type { NetworkMetaDataT, NetworkT, NodeDataT } from "../../redux/slices/ModelCreationSlice";
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

const mockEdges: Array<Edge> = [
	{
		id: "1~net|2~input",
		source: "1",
		target: "2",
		sourceHandle: "1~net",
		targetHandle: "2~input",
	},
	{
		id: "2~output|3~positive",
		source: "2",
		target: "3",
		sourceHandle: "2~output",
		targetHandle: "3~positive",
	},
	{
		id: "2~output|6~net",
		source: "2",
		target: "6",
		sourceHandle: "2~output",
		targetHandle: "6~net",
	},
	{
		id: "2~output|4~input",
		source: "2",
		target: "4",
		sourceHandle: "2~output",
		targetHandle: "4~input",
	},
	{
		id: "3~output|7~net",
		source: "3",
		target: "7",
		sourceHandle: "3~output",
		targetHandle: "7~net",
	},
	{
		id: "4~output|3~negative",
		source: "4",
		target: "3",
		sourceHandle: "4~output",
		targetHandle: "3~negative",
	},
	{
		id: "4~output|5~net",
		source: "4",
		target: "5",
		sourceHandle: "4~output",
		targetHandle: "5~net",
	},
];

const mockParams: Record<string, Record<string, string>> = {
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
			position: { x: -192.89334108322325, y: 14.258033289299902 },
			terminals: [
				{
					id: "1~net",
					parent_element_id: "1",
					type_name: "net",
					node_name: "1~net",
				},
			],
			element_type_params: {
				Terminal: {
					is_input: "true",
					is_output: "false",
					hardware_pin: "A0",
				},
			},
		},
		{
			id: "2",
			name: "PeakDetector",
			parent_network_id: MOCK_NETWORK_ID,
			type_name: "PeakDetector",
			element_type_params: {
				PeakDetector: {
					atk: "20000",
					dec: "100",
					model_version: "SecondOrder",
				},
			},
			position: { x: -67.1790478203435, y: 15.172102509907518 },
			terminals: [
				{
					id: "2~input",
					parent_element_id: "2",
					type_name: "input",
					node_name: "1~net",
				},
				{
					id: "2~output",
					parent_element_id: "2",
					type_name: "output",
					node_name: "2~output",
				},
			],
		},
		{
			id: "3",
			name: "Comparator",
			parent_network_id: MOCK_NETWORK_ID,
			type_name: "Comparator",
			terminals: [
				{
					id: "3~positive",
					parent_element_id: "3",
					type_name: "positive",
					node_name: "2~output",
				},
				{
					id: "3~output", //terminal ID
					parent_element_id: "3",
					type_name: "output",
					node_name: "3~output",
				},
				{
					id: "3~negative", //terminal ID
					parent_element_id: "3",
					type_name: "negative",
					node_name: "4~output",
				},
			],
			position: { x: 393.3637157199475, y: -9.63277357992078 },
			element_type_params: {
				Comparator: { threshold: "0.09" },
			},
		},
		{
			id: "4",
			name: "Filter",
			parent_network_id: MOCK_NETWORK_ID,
			type_name: "Filter",
			terminals: [
				{
					id: "4~input",
					parent_element_id: "4",
					type_name: "input",
					node_name: "2~output",
				},
				{
					id: "4~output",
					parent_element_id: "4",
					type_name: "output",
					node_name: "4~output",
				},
			],
			position: { x: 197.81003540290646, y: 339.5152253632761 },
			element_type_params: {
				Filter: { characteristic_frequency: "20", filter_type: "lpf1", quality_factor: "2" },
			},
		},
		{
			id: "5",
			name: "Sink",
			parent_network_id: MOCK_NETWORK_ID,
			type_name: "Terminal",
			terminals: [
				{
					id: "5~net",
					parent_element_id: "5",
					type_name: "net",
					node_name: "4~output",
				},
			],
			position: { x: 444.61224834874497, y: 339.3064750330251 },
			element_type_params: {
				Terminal: {
					is_input: "false",
					is_output: "true",
				},
			},
		},
		{
			id: "6",
			name: "Sink",
			parent_network_id: MOCK_NETWORK_ID,
			type_name: "Terminal",
			terminals: [
				{
					id: "6~net",
					parent_element_id: "6",
					type_name: "net",
					node_name: "2~output",
				},
			],
			position: { x: -44.197768031703845, y: 285.0502742404228 },
			element_type_params: {
				Terminal: {
					is_input: "false",
					is_output: "true",
				},
			},
		},
		{
			id: "7",
			name: "Sink",
			parent_network_id: MOCK_NETWORK_ID,
			type_name: "Terminal",
			terminals: [
				{
					id: "7~net",
					parent_element_id: "7",
					type_name: "net",
					node_name: "3~output",
				},
			],
			position: { x: 680.914020607662, y: 14.470509907529788 },
			element_type_params: {
				Terminal: {
					hardware_pin: "D3",
					is_input: "false",
					is_output: "true",
				},
			},
		},
	],
	nodes: [
		{
			id: "1~net",
			name: "1~net",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["1~net", "2~input"],
		},
		{
			id: "2~output",
			name: "2~output",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["2~output", "3~positive", "6~net", "4~input"],
		},
		{
			id: "3~output",
			name: "3~output",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["3~output", "7~net"],
		},
		{
			id: "4~output",
			name: "4~output",
			parent_network_id: MOCK_NETWORK_ID,
			terminal_ids: ["4~output", "3~negative", "5~net"],
		},
	],
};
