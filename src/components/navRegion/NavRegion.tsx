import React from "react";
import type { NavSectionT } from "./navSection/NavSection";
import { NavSection } from "./navSection/NavSection";

export type NavRegionT = {
	navSections: NavSectionT[];
};

export const NavRegion = ({ navSections, ...props }: NavRegionT) => (
	<>
		{navSections.map(({ heading, isOpen, navLinks, selectedIndex }, index) => (
			// Printing every nav-section
			<NavSection
				key={index}
				heading={heading}
				isOpen={isOpen}
				navLinks={navLinks}
				selectedIndex={selectedIndex}
			/>
		))}
	</>
);
