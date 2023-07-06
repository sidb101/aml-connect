import { NavLink, type NavLinkT } from "./NavLink/NavLink";
import "./NavSection.scss";
import type React from "react";

export type NavSectionT = {
	heading: string;
	navLinks?: NavLinkT[];
	selectedIndex?: number;
	setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
};
export const NavSection = ({ heading, navLinks, selectedIndex = 0, ...props }: NavSectionT) => (
	<div className={"NavSection_container"}>
		<div className={"dark-grey-panel NavSection_content"}>
			<div className={"NavSection_heading"}> {heading} </div>
			<div className={"NavSection_navLinks"}>
				{navLinks?.map((navLink, index) => (
					<NavLink
						key={index}
						label={navLink.label}
						route={navLink.route}
						isEnabled={navLink.isEnabled}
						isSelected={selectedIndex === index}
						index={navLink.index}
						setSelectedIndex={props.setSelectedIndex}
					/>
				))}
			</div>
		</div>
	</div>
);
