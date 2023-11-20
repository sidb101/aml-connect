/**
 * This slice would deal with all the model creation related parts of the state, which are
 * network creation, network parameters, neural networks, etc.
 * The slice would give different actions that can be dispatched to update the
 * given data hub state
 */
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import type { Connection, Edge, EdgeChange, Node, NodeAddChange, NodeChange } from "reactflow";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { mockNetwork, mockNetworkMetaData } from "../../tests/mockdata/networkMock";

/*** Types for  Possible Network Elements ***/

/**
 * Type to describe all the information about a simulator element
 */
export type ElementT = {
	typeName: string; //Unique identifier for every element
	shortDescription: string;
	longDescription: string;
	terminals: Record<string, TerminalT>; //Terminal type -> Terminal Info
	parameters?: Record<string, ParameterT>; //Parameter type -> Parameter Info
};

/**
 * Type to describe all the information about a terminal of an element
 */
export type TerminalT = {
	description: string;
	direction?: DirectionT;
	// eslint-disable-next-line @typescript-eslint/ban-types
	default: string | null;
	dcRange?: string;
	acRange?: string;
};

/**
 * Type to describe parameter information
 */
export type ParameterT = {
	parameterType: ParamTypeT;
	description?: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	default: string | null;
	rangeType?: RangeT;
	// eslint-disable-next-line @typescript-eslint/ban-types
	range?: Array<string | null>;
	unit?: string;
	uiComponent: UIComponentT;
};

export enum DirectionT {
	//The String values are consistent with the backend contract
	INPUT = "input",
	OUTPUT = "output",
}

export enum ParamTypeT {
	//The String values are consistent with the backend contract
	NUMBER = "number",
	STRING = "string",
	BOOLEAN = "boolean",
}

export enum RangeT {
	//The String values are consistent with the backend contract
	DISCRETE = "discrete",
	INTERVAL = "interval",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum UIComponentT {
	//The String values are consistent with the backend contract
	CHECKBOX = "checkbox",
	DROPDOWN = "dropdown",
	TEXTBOX = "textbox",
}

/*** Types for Possible Networks ***/

/**
 * Type to describe basic information about a network
 */
export type NetworkMetaDataT = {
	id: number;
	name: string;
};

/**
 * Type to describe a network in detail. Uses React flow types to describe the network
 */
export type NetworkT = {
	metaData: NetworkMetaDataT;
	nodes: Array<Node<NodeDataT>>;
	edges: Array<Edge<EdgeDataT>>;
	params: Record<string, Record<string, string>>; //<NodeId -> Parameter Object having key value>
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
	sourceTerminalType: string;
	targetTerminalType: string;
};

type ModelCreationState = {
	allNetworks: NetworkMetaDataT[]; //Used to show all available networks of user to choose from
	allElements: Record<string, ElementT>; //information about all the elements that can be used to create the network
	selectedNetwork: NetworkT;
};

const initialState: ModelCreationState = {
	allNetworks: [mockNetworkMetaData],
	allElements: {},
	selectedNetwork: mockNetwork,
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
		 * @param state Model Creation State
		 * @param action The action would have the Node changes needed to be applied
		 */
		updateNodes: (state, action: PayloadAction<{ nodeChanges: NodeChange[] }>) => {
			state.selectedNetwork.nodes = applyNodeChanges(action.payload.nodeChanges, state.selectedNetwork.nodes);
		},

		/**
		 * To incorporate any changes done in the edges of the network.
		 * @param state Model Creation State
		 * @param action The action would have the edge changes needed to be applied
		 */
		updateEdges: (state, action: PayloadAction<{ edgeChanges: EdgeChange[] }>) => {
			state.selectedNetwork.edges = applyEdgeChanges(action.payload.edgeChanges, state.selectedNetwork.edges);
		},

		removeEdge: (state, action: PayloadAction<{ edgeToRemove: Edge }>) => {
			const { edgeToRemove } = action.payload;
			console.log(`remove`, edgeToRemove);
			state.selectedNetwork.edges = state.selectedNetwork.edges.filter((edge) => edge.id !== edgeToRemove.id);
		},

		/**
		 * To connect two nodes of the network.
		 * @param state Model Creation State
		 * @param action The action would have the connection needed to be applied
		 */
		connectNodes: (state, action: PayloadAction<{ connection: Connection }>) => {
			state.selectedNetwork.edges = addEdge(action.payload.connection, state.selectedNetwork.edges);
		},

		/**
		 * To add a new node to the network.
		 * @param state Model Creation State
		 * @param action The action would have the node to be added
		 */
		addNode: (state, action: PayloadAction<{ node: Node<NodeDataT> }>) => {
			//add the node
			const { node } = action.payload;
			const { elementType } = node.data;
			state.selectedNetwork.nodes = [...state.selectedNetwork.nodes, node];

			//add the default params for that node in current state
			const element = state.allElements[elementType];
			if (element.parameters) {
				state.selectedNetwork.params[node.id] = getDefaultParams(element.parameters);
			}
		},
		/**
		 * Sets the elements that the user would want to use to create simulation network
		 * @param state Model creation state
		 * @param action The action would have all the elements that the simulator supports
		 */
		setAllElements: (state, action: PayloadAction<{ allElements: Record<string, ElementT> }>) => {
			state.allElements = action.payload.allElements;
		},

		setParameters: (state, action: PayloadAction<{ nodeId: string; params: Record<string, string> }>) => {
			state.selectedNetwork.params[action.payload.nodeId] = action.payload.params;
		},
	},
});

export const selectCurrentNetwork = createSelector(
	[(state: RootState) => state.modelCreation],
	(state) => state.selectedNetwork
);

export const selectAllElements = createSelector(
	[(state: RootState) => state.modelCreation],
	(state) => state.allElements
);

export const selectNodeParams = createSelector(
	[(state: RootState) => state.modelCreation, (_, nodeId: string) => nodeId],
	(state, nodeId) => state.selectedNetwork.params[nodeId]
);

/**** Utility Methods ***/
export const getDefaultParams = (paramInfo: Record<string, ParameterT>): Record<string, string> => {
	const paramEntries = Object.entries(paramInfo).map(([key, value]) => [key, value.default]);
	return Object.fromEntries(paramEntries) as Record<string, string>;
};

export const { reducer: modelCreationReducer, actions: modelCreationActions } = modelCreationSlice;
