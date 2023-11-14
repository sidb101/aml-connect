import "./Sidebar.scss";
import React from "react";
import SideRegion, { type SideRegionT } from "./sideRegion/SideRegion";
import { Link } from "react-router-dom";
import { testIds } from "../../tests/test-utils";

type SidebarProps = {
	logo: string;
	sideRegions?: SideRegionT[];
};

function Sidebar({ logo, sideRegions }: SidebarProps) {
	return (
		<div className={"dark-panel Sidebar_container"} data-testid={testIds.sideBar}>
			<div className={"brand-text Sidebar_logo"}>
				<Link to={"/"}> {logo} </Link>
			</div>
			<div className={"Sidebar_regionContainer"}>
				{sideRegions?.map(({ heading, region, isVisible }: SideRegionT, index) => (
					// Printing every region in the Sidebar
					<SideRegion key={index} heading={heading} region={region} isVisible={isVisible} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
