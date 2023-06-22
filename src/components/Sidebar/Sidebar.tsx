import "./Sidebar.scss";
import React from "react";
import { SideRegion, type SideRegionT } from "./SideRegion/SideRegion";

export type SidebarT = {
    logo: string;
    sideRegion?: SideRegionT[];
};

export const Sidebar = ({ logo, sideRegion, ...props }: SidebarT) => (
    <div className={"dark-panel Sidebar_container"}>
        <div className={"brand-text Sidebar_logo"}>{logo}</div>

        <div className={"Sidebar_regionContainer"}>
            {sideRegion?.map(({ heading, region }: SideRegionT) => (
                // Printing every region in the Sidebar
                <>
                    <SideRegion heading={heading} region={region} />
                </>
            ))}
        </div>
    </div>
);
