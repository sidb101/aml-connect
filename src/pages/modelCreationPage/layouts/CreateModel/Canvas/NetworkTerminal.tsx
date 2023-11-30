import "./NetworkTerminal.scss";
import { type NodeProps, Position } from "reactflow";
import type { NodeDataT } from "../../../../../redux/slices/ModelCreationSlice";
import { isSource, newHandleId } from "./canvasUtils";
import TerminalHandle from "./TerminalHandle";

const NetworkTerminal = ({ id, data }: NodeProps<NodeDataT>) => {
	return (
		<div className={"NetworkTerminal_node"}>
			{isSource(data) ? (
				<TerminalHandle id={newHandleId(id, "net")} type={"source"} position={Position.Right} />
			) : (
				<TerminalHandle
					id={newHandleId(id, "net")}
					type={"target"}
					position={Position.Left}
					connectionLimit={1}
				/>
			)}
			<div className={`NetworkTerminal_nodeLabel`}>{data.label}</div>
		</div>
	);
};

export default NetworkTerminal;
