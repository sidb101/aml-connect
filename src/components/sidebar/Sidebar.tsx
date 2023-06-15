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
        <>
            <h1>{logo}</h1>
            {sideSections?.map(({label, isOpen}: ISideSection) => 
                    <>
                        <SideSection
                            label = {label}
                            isOpen = {isOpen}
                        />
                    </>
                )
            }
        </>
    );
};