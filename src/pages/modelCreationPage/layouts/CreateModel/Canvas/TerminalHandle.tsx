import { getConnectedEdges, Handle, type HandleProps, type ReactFlowState, useNodeId, useStore } from "reactflow";
import { type HTMLAttributes, type PropsWithChildren, useMemo } from "react";

/*******
 * A custom Handle for terminals
 * Using the official react-flow example: https://reactflow.dev/examples/nodes/connection-limit
 * *****/

type TerminalHandleProps = HandleProps &
	Omit<HTMLAttributes<HTMLDivElement>, "id"> & {
		connectionLimit?: number;
	};

const selector = (s: ReactFlowState) => ({
	nodeInternals: s.nodeInternals,
	edges: s.edges,
});

const TerminalHandle = ({ connectionLimit, children, ...props }: PropsWithChildren<TerminalHandleProps>) => {
	const { nodeInternals, edges } = useStore(selector);
	const nodeId = useNodeId();
	const isHandleConnectable = useMemo(() => {
		if (connectionLimit && nodeId) {
			const node = nodeInternals.get(nodeId);
			if (node) {
				const connectedEdges = getConnectedEdges([node], edges).filter((edge) => {
					// console.log(id, edge);
					return edge.sourceHandle === props.id || edge.targetHandle === props.id;
				});
				return connectedEdges.length < connectionLimit;
			}
			return true;
		}

		return true;
	}, [nodeInternals, edges, nodeId, connectionLimit, props.id]);

	return (
		<Handle {...props} isConnectable={isHandleConnectable}>
			{children}
		</Handle>
	);
};

export default TerminalHandle;
