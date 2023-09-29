import "./Dropdown.scss";
import React from "react";
import ReactFlow, { type Node } from "reactflow";

type DropdownProps = {
	options: Node[];
	onOptionClick: (option: Node) => void;
	onClose: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onOptionClick, onClose }) => {
	return (
		<div
			className={`Dropdown_container`}
			onBlur={onClose} // close dropdown when it loses focus
			tabIndex={0}
		>
			{options.map((option) => (
				<div
					className={`regular-text Dropdown_option`}
					key={option.data.label}
					onClick={() => {
						onOptionClick(option);
					}}
				>
					{option.data.menuLabel}
				</div>
			))}
		</div>
	);
};

export default Dropdown;
