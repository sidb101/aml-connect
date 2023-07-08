import "./NavRegion.scss";
import { NavLink, type NavLinkT } from "./navLink/NavLink";

export type NavSectionT = {
	heading?: string;
	navLinks?: NavLinkT[];
};
export const NavRegion = ({ heading, navLinks, ...props }: NavSectionT) => (
	<div className={"NavSection_container"}>
		<div className={"dark-grey-panel NavSection_content"}>
			{heading && <div className={"NavSection_heading"}> {heading} </div>}
			{navLinks && (
				<div className={"NavSection_navLinks"}>
					{navLinks.map((navLink, index) => (
						<NavLink
							key={index}
							label={navLink.label}
							isEnabled={navLink.isEnabled}
							isSelected={navLink.isSelected}
							route={navLink.route}
						/>
					))}
				</div>
			)}
		</div>
	</div>
);
