/***
 * Certain Util Functions to help with the interaction with the network through canvas
 */
import type { Node, XYPosition } from "reactflow";
import type { ElementT, NetworkT, NodeDataT } from "../../../../../redux/slices/ModelCreationSlice";

/* eslint-disable  @typescript-eslint/naming-convention */
export const TERMINAL_SPACING = 25;
export const NODE_MIN_HEIGHT = TERMINAL_SPACING * 1.5;

export const newNodePosition = (network: NetworkT): XYPosition => {
	const currentNodes: Array<Node<NodeDataT>> = network.nodes;
	return {
		x: currentNodes[currentNodes.length - 1].position.x - 25,
		y: currentNodes[currentNodes.length - 1].position.y + 25,
	};
};

export const newNodeId = (network: NetworkT): string => String(network.nodes.length + 1);
export const newEdgeId = (sourceNodeId: string, destNodeId: string) => `edge__${sourceNodeId}-${destNodeId}`;
export const newHandleId = (nodeId: string, handleType: string) => `handle__${nodeId}-${handleType}`;

export const newNode = (network: NetworkT, element: ElementT): Node<NodeDataT> => {
	const label = element.typeName;
	return {
		id: newNodeId(network),
		type: label === "Source" || label === "Sink" ? "networkTerminal" : "networkElement",
		data: { label: label, elementType: label },
		position: newNodePosition(network),
	};
};

export const isSource = (node: NodeDataT): boolean => node.elementType === "Source";

export const getNodeSpacings = (leftTerminalsCount: number, rightTerminalsCount: number) => {
	const height = Math.max(
		(Math.max(leftTerminalsCount, rightTerminalsCount) + 1) * TERMINAL_SPACING,
		NODE_MIN_HEIGHT
	);
	const leftSpacing = height / (leftTerminalsCount + 1);
	const rightSpacing = height / (rightTerminalsCount + 1);
	return {
		height,
		leftSpacing,
		rightSpacing,
	};
};
