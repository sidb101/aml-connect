import {INavSection, NavSection} from "./NavSection/NavSection";

export interface INavRegion {
    navSections: INavSection[];
}

export const NavRegion = ({navSections, ...props}: INavRegion) => {
    return (<>
        {navSections.map(({heading, isOpen, navLinks, selectedIndex}) =>
            //printing every nav-section
            <NavSection heading={heading} isOpen={isOpen} navLinks={navLinks} selectedIndex={selectedIndex}/>)
        }
    </>)
}