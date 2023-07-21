import "./NavLink.scss";
import type React from "react";
import { Link } from "react-router-dom";
import { testIds } from "../../../../tests/test-utils";

export type NavLinkT = {
	label?: string;
	isEnabled?: boolean;
	isSelected?: boolean;
	setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
	route: string;
	parentLink?: NavLinkT;
};

export const linkSelectedClass = "NavLink_link___selected";
export const linkEnabledClass = "NavLink_link___enabled";

/**
 * Will determine if the given NavLink should be logically selected or not, depending on
 * the pathname. Either path name should be equal to the route, or its parent should be equal to
 * the nav link.
 * @param pathname
 * @param navLink
 */
export function isNavLinkSelected(navLink: NavLinkT, pathname: string): boolean {
	return (
		pathname.startsWith(navLink.route) || (!!navLink.parentLink && isNavLinkSelected(navLink.parentLink, pathname))
	);
}

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
