import "./SideRegion.scss";
import React from "react";
import {JSX} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";


export interface ISideRegion {
    heading: string;
    region: JSX.Element | JSX.Element[]; //Any React Component to render in that region
}

export const SideRegion = ({heading, region, ...props}: ISideRegion) => {
    return (
        <div className={"SideRegion_container"}>
            <div className={"small-text light-text SideRegion_heading"}>
                {heading} &nbsp;
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            {region}
        </div>
    );
}