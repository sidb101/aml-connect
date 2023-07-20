import "./NavLink.scss";
import type React from "react";
import { Link } from "react-router-dom";
import { testIds } from "../../../../tests/test-utils";

export type NavLinkT = {
	label: string;
	isEnabled?: boolean;
	isSelected?: boolean;
	setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
	route: string;
};

export const linkSelectedClass = "NavLink_link___selected";
export const linkEnabledClass = "NavLink_link___enabled";

export const NavLink = ({ label, isEnabled = true, isSelected = false, ...props }: NavLinkT) => {
	const isSelectedClass = isSelected ? linkSelectedClass : "";
	const isEnabledClass = isEnabled ? linkEnabledClass : "";

	return (
		<div className={"NavLink_container"}>
			<Link to={props.route} data-testid={testIds.navLinks}>
				<div
					className={`NavLink_link ${isSelectedClass} ${isEnabledClass}`}
					data-testid={testIds.navLinkLabels}
				>
					{label}
				</div>
			</Link>
		</div>
	);
};
