import "./NavLink.scss";
import { Link } from "react-router-dom";
import type React from "react";

export type NavLinkT = {
	index: number;
	label: string;
	route: string;
	isEnabled?: boolean;
	isSelected?: boolean;
	setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
};

export const NavLink = ({ label, route, isEnabled = true, isSelected = false, ...props }: NavLinkT) => {
	const isSelectedClass = isSelected ? "NavLink_link___selected" : "";
	const isEnabledClass = isEnabled ? "NavLink_link___enabled" : "";

	return (
		<div className={"NavLink_container"}>
			<Link
				to={route}
				onClick={() => {
					if (props.setSelectedIndex) {
						props.setSelectedIndex(props.index);
					}
				}}
			>
				<div className={`NavLink_link ${isSelectedClass} ${isEnabledClass}`} data-testid={"NavLink_label"}>
					{label}
				</div>
			</Link>
		</div>
	);
};
