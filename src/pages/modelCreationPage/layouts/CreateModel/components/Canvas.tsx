import { useCallback, useState } from "react";
import ReactFlow, {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	BackgroundVariant,
	type Connection,
	ConnectionLineType,
	Controls,
	type DefaultEdgeOptions,
	type Edge,
	type EdgeChange,
	type FitViewOptions,
	MiniMap,
	type Node,
	type NodeChange,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
} from "reactflow";

import "reactflow/dist/style.css";
import "./Canvas.scss";
import { initialEdges, initialNodes } from "../../../../../tests/mockdata/allNodesAndEdges";
import Dropdown from "./Dropdown";

const fitViewOptions: FitViewOptions = {
	padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: "step",
};

export default function Canvas() {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);

	const [showDropdown, setShowDropdown] = useState(false);
	const [userOption, setUserOption] = useState("");

	// Define the options for the dropdown.
	const options = ["Option 1", "Option 2", "Option 3"];

	// Handle the click event of the dropdown option.
	const handleOptionClick = (option: string) => {
		console.log("Selected:", option);
		setUserOption(option);
		setShowDropdown(false); // close the dropdown when an option is clicked
	};

	const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
		setNodes((nodes: Node[]) => applyNodeChanges(changes, nodes));
	}, []);

	const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
		setEdges((edges: Edge[]) => applyEdgeChanges(changes, edges));
	}, []);

	const onConnect: OnConnect = useCallback((connection: Connection) => {
		setEdges((edges: Edge[]) => addEdge(connection, edges));
	}, []);

	const onAdd = useCallback(() => {
		const newNode = (nodes: Node[]) => {
			return {
				id: String(nodes.length + 1),
				type: "custom",
				position: {
					x: nodes[nodes.length - 1].position.x - 25,
					y: nodes[nodes.length - 1].position.y + 25,
				},
				data: { label: "Added node" },
			};
		};

		setNodes((nodes: Node[]) => nodes.concat(newNode(nodes)));
	}, []);

	return (
		<div className={`Canvas_container`}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
				fitViewOptions={fitViewOptions}
				defaultEdgeOptions={defaultEdgeOptions}
				connectionLineType={ConnectionLineType.Step}
			>
				<div className={`Canvas_allMenuContainer`}>
					<div className={`Canvas_sideMenuContainer`}>
						<div className={`Canvas_sideMenuBtnContainer`}>
							<button
								onClick={() => {
									setShowDropdown((s) => !s);
								}}
							>
								+
							</button>
						</div>
					</div>
					<div className={`Canvas_sideMenuContainer`}>
						<div className={`Canvas_sideMenuNodeMenuContainer`}>
							{showDropdown && (
								<Dropdown
									options={options}
									onOptionClick={handleOptionClick}
									onClose={() => {
										setShowDropdown(false);
									}}
								/>
							)}
						</div>
					</div>
				</div>
				<Controls className={`Canvas_controls`} />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
