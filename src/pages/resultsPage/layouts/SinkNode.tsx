import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import "./SinkNode.scss";

export default function SinkNode({ data }: NodeProps) {
	return (
		<div className={`SinkNode`}>
			<Handle type="target" position={Position.Left} />
			<div>{data.label}</div>
		</div>
	);
}
