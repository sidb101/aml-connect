import "./NavRegion.scss";
import { NavLink, type NavLinkT } from "./navLink/NavLink";
import { testIds } from "../../../tests/test-utils";

type NavRegionProps = {
	heading?: string;
	navLinks?: NavLinkT[];
};
export const NavRegion = ({ heading, navLinks }: NavRegionProps) => (
	<div className={"NavRegion_container"}>
		<div className={"dark-grey-panel NavRegion_content"}>
			{heading && (
				<div className={"NavRegion_heading"} data-testid={testIds.navHeading}>
					{" "}
					{heading}{" "}
				</div>
			)}
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
