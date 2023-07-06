import type React from "react";
import type { NavSectionT } from "./NavSection/NavSection";
import { NavSection } from "./NavSection/NavSection";

export type NavRegionT = {
	navSection: NavSectionT;
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const NavRegion = ({ navSection, ...props }: NavRegionT) => (
	<>
		<NavSection
			heading={navSection.heading}
			navLinks={navSection.navLinks}
			selectedIndex={navSection.selectedIndex}
			setSelectedIndex={props.setSelectedIndex}
		/>
	</>
);
