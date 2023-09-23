import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import "./CustomNode.scss";
export default function CustomNode({ data }: NodeProps) {
	return (
		<div className={`CustomNode`}>
			{/*<Handle type="target" position="left" style={{ borderRadius: 0 }} />*/}
			<Handle type="target" position={Position.Left} />
			<div>{data.label}</div>
			{/*<Handle type="source" position="right" style={{ borderRadius: 0 }} />*/}
			<Handle type="source" position={Position.Right} />
		</div>
	);
}
