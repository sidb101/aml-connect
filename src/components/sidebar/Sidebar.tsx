import exp from "constants";
import "./Sidebar.scss";
import React from "react";
import { ISideSection, SideSection } from "./SideSection/SideSection";

export interface ISidebar {
    logo: string;
    sideSections?: ISideSection[];
};



export const Sidebar = ({logo, sideSections, ...props} : ISidebar) => {
    return (
        <div className={"dark-panel nav-container Sidebar_container"}>
            <h1>{logo}</h1>
            {sideSections?.map(({heading, isOpen}: ISideSection) =>
                    <>
                        <SideSection
                            heading= {heading}
                            isOpen = {isOpen}
                        />
                    </>
                )
            }
        </div>
    );
};