import "./Dropdown.scss";
import React from "react";

type DropdownProps = {
	options: string[];
	onOptionClick: (option: string) => void;
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
					className={`Dropdown_option`}
					key={option}
					onClick={() => {
						onOptionClick(option);
					}}
				>
					{option}
				</div>
			))}
		</div>
	);
};

export default Dropdown;
