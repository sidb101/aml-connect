import "./NavLink.scss";
import type React from "react";

export type NavLinkT = {
	label: string;
	isEnabled?: boolean;
	isSelected?: boolean;
	setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
};

export const NavLink = ({ label, isEnabled = true, isSelected = false, ...props }: NavLinkT) => {
	const isSelectedClass = isSelected ? "NavLink_link___selected" : "";
	const isEnabledClass = isEnabled ? "NavLink_link___enabled" : "";

	return (
		<div className={"NavLink_container"}>
			<div className={`NavLink_link ${isSelectedClass} ${isEnabledClass}`} data-testid={"NavLink_label"}>
				{label}
			</div>
		</div>
	);
};
