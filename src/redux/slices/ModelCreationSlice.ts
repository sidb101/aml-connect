/**
 * TODO: Need to figure out if we need the parameter types dynamically from the rust simulator.
 * If yes, then the simulation request shouldn't accept the Network parameters from UI,
 * rather just accept a generic object. Also, get_elements need to describe the type of parameter every element
 * takes which would include: Human Readable label, Input Type (text, number, dropdown, radio, checkbox, etc.)
 *
 * If no, then all the information fort the elements should be coded in the UI as well, because then get_elements()
 * doesn't make sense, because addition of a new element would any how cause code changes in backend and frontend.
 *
 * In both cases, we would need to create the parameter forms as per the specification. Either dynamically generate
 * them (which would require precise specification for each and every parameter),
 * or create a different parameter form for every element, and dynamically call the respective parameter form. (using component map)
 */

/**
 * This slice would deal with all the model creation related parts of the state, which are
 * network creation, network parameters, neural networks, etc.
 * The slice would give different actions that can be dispatched to update the
 * given data hub state
 */
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { type Parameters } from "../../service/RemoteService/client/bindings/Parameters";
import type { TerminalT } from "../../tests/mockdata/getElementsMockData";
import type { Node, Edge, NodeChange, EdgeChange, Connection } from "reactflow";
import { testEdges, testNetwork, testNetworkMetaData, testNodes } from "../../tests/mockdata/allNodesAndEdges";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";

export type ModelCreationState = {
	allNetworks: NetworkMetaDataT[]; //Used to show all available networks of user to choose from
	allElements: Record<string, ElementMetaDataT>;
	selectedNetwork: NetworkT;
	//TODO: Add parameters information
};

/**
 * Type to describe basic information about a network
 */
export type NetworkMetaDataT = {
	id: bigint;
	name: string;
};

/**
 * Type to describe all the information about a simulator element
 */
export type ElementMetaDataT = {
	shortDescription: string;
	longDescription: string;
	type: string;
	terminals: TerminalT;
	parameters?: any;
};

/**
 * Type to describe a network in detail. Uses React flow types to describe the network
 */
export type NetworkT = {
	metaData: NetworkMetaDataT;
	nodes: Array<Node<NodeDataT>>;
	edges: Array<Edge<EdgeDataT>>;
	params: Record<string, Parameters>; //Store the parameter values for every Node of the Graph
};

/**
 * Type to describe data to be stored for a particular node
 */
export type NodeDataT = {
	elementType: string;
	label: string;
};

/**
 * Type to describe data to be stored for a particular edge
 */
export type EdgeDataT = {
	data?: string;
};

const initialState: ModelCreationState = {
	allNetworks: [testNetworkMetaData],
	allElements: {},
	selectedNetwork: testNetwork,
};

/**
 * The slice of the state that would define all the actions and reducers for this state
 */
export const modelCreationSlice = createSlice({
	name: "modelCreation",
	initialState, // the type of this slice of the state would be inferred from the type of initial state
	reducers: {
		/**
		 * To incorporate any changes done in the nodes of the network.
		 * @param state: Model Creation State
		 * @param action: The action would have the Node changes needed to be applied
		 */
		updateNodes: (state, action: PayloadAction<{ nodeChanges: NodeChange[] }>) => {
			state.selectedNetwork.nodes = applyNodeChanges(action.payload.nodeChanges, state.selectedNetwork.nodes);
		},

		/**
		 * To incorporate any changes done in the edges of the network.
		 * @param state: Model Creation State
		 * @param action: The action would have the edge changes needed to be applied
		 */
		updateEdges: (state, action: PayloadAction<{ edgeChanges: EdgeChange[] }>) => {
			state.selectedNetwork.edges = applyEdgeChanges(action.payload.edgeChanges, state.selectedNetwork.edges);
		},

		/**
		 * To connect two nodes of the network.
		 * @param state: Model Creation State
		 * @param action: The action would have the connection needed to be applied
		 */
		connectNodes: (state, action: PayloadAction<{ connection: Connection }>) => {
			state.selectedNetwork.edges = addEdge(action.payload.connection, state.selectedNetwork.edges);
		},

		/**
		 * To add a new node to the network.
		 * @param state: Model Creation State
		 * @param action: The action would have the node to be added
		 */
		addNode: (state, action: PayloadAction<{ node: Node<NodeDataT> }>) => {
			state.selectedNetwork.nodes = [...state.selectedNetwork.nodes, action.payload.node];
		},
	},
});

export const selectCurrentNetwork = createSelector([(state: RootState) => state.modelCreation], (state) => {
	return state.selectedNetwork;
});

export const {
	name: modelCreationSliceKey,
	reducer: modelCreationReducer,
	actions: modelCreationActions,
} = modelCreationSlice;
