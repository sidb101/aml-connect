import "./NavRegion.scss";
import { NavLink, type NavLinkT } from "./navLink/NavLink";

export type NavRegionT = {
	heading?: string;
	navLinks?: NavLinkT[];
};
export const NavRegion = ({ heading, navLinks, ...props }: NavRegionT) => (
	<div className={"NavRegion_container"}>
		<div className={"dark-grey-panel NavRegion_content"}>
			{heading && <div className={"NavRegion_heading"}> {heading} </div>}
			{navLinks && (
				<div className={"NavRegion_navLinks"}>
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
