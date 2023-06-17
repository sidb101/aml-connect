import exp from "constants";
import "./Sidebar.scss";
import React from "react";
import { ISideRegion, SideRegion } from "./SideRegion/SideRegion";

export interface ISidebar {
    logo: string;
    sideRegion?: ISideRegion[];
}

export const Sidebar = ({logo, sideRegion, ...props} : ISidebar) => {
    return (
        <div className={"dark-panel Sidebar_container"}>
            <div className={"brand-text Sidebar_logo"}>{logo}</div>

            <div className={"Sidebar_regionContainer"}>
            {sideRegion?.map(({heading, region}: ISideRegion) =>
                    //printing every region in the Sidebar
                    <>
                        <SideRegion
                            heading = {heading}
                            region= {region}
                        />
                    </>
                )
            }
            </div>
        </div>
    );
};