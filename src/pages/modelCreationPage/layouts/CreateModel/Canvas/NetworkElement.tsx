import "./NetworkElement.scss";
import { Handle, type NodeProps, Position } from "reactflow";
import type { NodeDataT } from "../../../../../redux/slices/ModelCreationSlice";
import { DirectionT } from "../../../../../redux/slices/ModelCreationSlice";
import { useAppSelector } from "../../../../../hooks";
import { getNodeSpacings, newHandleId } from "./canvasUtils";
import { useMemo } from "react";
import TerminalHandle from "./TerminalHandle";

const NetworkElement = ({ id, data }: NodeProps<NodeDataT>) => {
	const elementData = useAppSelector((state) => state.modelCreation.allElements[data.elementType]);

	const leftTerminals = useMemo(
		() =>
			elementData
				? Object.entries(elementData.terminals).filter(
						([_, terminal]) => terminal.direction === DirectionT.INPUT
				  )
				: [],
		[elementData]
	);

	const rightTerminals = useMemo(
		() =>
			elementData
				? Object.entries(elementData.terminals).filter(
						([_, terminal]) => terminal.direction === DirectionT.OUTPUT
				  )
				: [],
		[elementData]
	);

	const { height, rightSpacing, leftSpacing } = useMemo(
		() =>
			elementData
				? getNodeSpacings(leftTerminals.length, rightTerminals.length)
				: //while the elementData is not loaded
				  { height: 0, rightSpacing: 0, leftSpacing: 0 },

		[elementData]
	);

	return (
		elementData && (
			<div className={`NetworkElement_node`} style={{ height: height }}>
				{leftTerminals.map(([terminalKey, terminal], key) => (
					<TerminalHandle
						key={key}
						type={"target"}
						id={newHandleId(id, terminalKey)}
						position={Position.Left}
						style={{ top: (key + 1) * leftSpacing }}
						title={terminalKey}
						className={`NetworkElement_handle`}
						connectionLimit={1}
					>
						{terminalKey}
					</TerminalHandle>
				))}
				<div className={`NetworkElement_nodeLabel`}>{data.label}</div>
				{rightTerminals.map(([terminalKey, terminal], key) => (
					<TerminalHandle
						key={key}
						type={"source"}
						id={newHandleId(id, terminalKey)}
						position={Position.Right}
						style={{ top: (key + 1) * rightSpacing }}
						title={terminalKey}
						className={`NetworkElement_handle`}
					>
						{terminalKey}
					</TerminalHandle>
				))}
			</div>
		)
	);
};

export default NetworkElement;
