import { ISideLink } from "./SideLink/SideLink";


export interface ISideSection {
    heading: string;
    sideLinks?: ISideLink[];
    isOpen: boolean;
    selectedIndex?: number; // if out of bounds, then nothing would be selected
};

export const SideSection = ({heading, isOpen, selectedIndex, ...props}: ISideSection) => {
    return (
        <>
            <h2>{heading}</h2>
        </>
    );
}