import { NavLink, type NavLinkT } from "./NavLink/NavLink";
import "./NavSection.scss";

export type NavSectionT = {
    heading: string;
    navLinks?: NavLinkT[];
    isOpen: boolean;
    selectedIndex?: number; // If out of bounds, then nothing would be selected
};
export const NavSection = ({
    heading,
    isOpen,
    selectedIndex,
    navLinks,
    ...props
}: NavSectionT) => (
    <div className={"NavSection_container"}>
        <div className={"dark-grey-panel NavSection_content"}>
            <div className={"NavSection_heading"}> {heading} </div>
            {isOpen && (
                <div className={"NavSection_navLinks"}>
                    {navLinks?.map((navLink, index) => (
                        <NavLink
                            key={index}
                            label={navLink.label}
                            route={navLink.route}
                            isEnabled={navLink.isEnabled}
                            isSelected={navLink.isSelected}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
);
