import "./NetworkTerminal.scss";
import { Handle, type NodeProps, Position } from "reactflow";
import type { NodeDataT } from "../../../../../redux/slices/ModelCreationSlice";
import { isSource } from "./canvasUtils";

const NetworkTerminal = ({ data }: NodeProps<NodeDataT>) => {
	return (
		<div className={"NetworkTerminal_node"}>
			{isSource(data) ? (
				<Handle type={"source"} position={Position.Right} />
			) : (
				<Handle type={"target"} position={Position.Left} />
			)}
			<div className={`NetworkTerminal_nodeLabel`}>{data.label}</div>
		</div>
	);
};

export default NetworkTerminal;
