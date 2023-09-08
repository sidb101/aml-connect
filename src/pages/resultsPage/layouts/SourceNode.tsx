import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import "./SourceNode.scss";

export default function SourceNode({ data }: NodeProps) {
	return (
		<div className={`SourceNode`}>
			<div>{data.label}</div>
			<Handle type="source" position={Position.Right} />
		</div>
	);
}
