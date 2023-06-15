import { ISideLink } from "./SideLink/SideLink";


export interface ISideSection {
    label?: string;
    sideLinks?: ISideLink[];
    isOpen: boolean;
    selectedIndex?: number; // if out of bounds, then nothing would be selected
};

export const SideSection = ({label, isOpen, selectedIndex, ...props}: ISideSection) => {
    return (
        <>
            <h2>{label}</h2>
            <br/>
        </>
    );
}