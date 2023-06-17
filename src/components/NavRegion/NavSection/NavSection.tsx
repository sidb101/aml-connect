import {INavLink, NavLink} from "./NavLink/NavLink";
import "./NavSection.scss";


export interface INavSection {
    heading: string;
    navLinks?: INavLink[];
    isOpen: boolean;
    selectedIndex?: number; // if out of bounds, then nothing would be selected
}
export const NavSection = ({heading, isOpen, selectedIndex, navLinks, ...props}: INavSection) => {
    return (
        <div className={"NavSection_container"}>
            <div className={"dark-grey-panel NavSection_content"}>
                <div className={"NavSection_heading"}> {heading} </div>
                { isOpen &&
                    <div className={"NavSection_navLinks"}>
                        {navLinks?.map(navLink =>
                            <NavLink label={navLink.label}
                                     route={navLink.route}
                                     isEnabled={navLink.isEnabled}
                                     isSelected={navLink.isSelected}
                            />
                        )}
                    </div>
                }
            </div>
    </div>)
}