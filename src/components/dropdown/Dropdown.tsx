import "./Dropdown.scss";
import React, { useEffect, useRef } from "react";

//TODO: Make this component Generic
type DropdownProps = {
	options: OptionT[];
	onOptionClick: (option: OptionT) => void;
	onClose: () => void;
};

export type OptionT = {
	label: string;
	menuLabel: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onOptionClick, onClose }) => {
	return (
		<div
			className={`Dropdown_container`}
			onBlur={onClose} // close dropdown when it loses focus
			tabIndex={0}
			role="listbox"
		>
			{options.map((option, index) => (
				<div
					className={`regular-text Dropdown_option`}
					key={option.label}
					onClick={() => {
						onOptionClick(option);
					}}
				>
					{option.menuLabel}
				</div>
			))}
		</div>
	);
};

export default Dropdown;
