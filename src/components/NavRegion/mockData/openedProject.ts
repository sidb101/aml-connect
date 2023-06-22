import type { NavSectionT } from "../NavSection/NavSection";

const openProjectsSections: NavSectionT[] = [
    {
        heading: "Glass Break Detection",
        isOpen: true,
        navLinks: [
            {
                label: "Overview",
            },
            {
                label: "Data Hub",
            },
            {
                label: "Model Creation",
            },
            {
                label: "Results",
            },
            {
                label: "Send to Hardware",
            },
        ],
        selectedIndex: 0,
    },
];

export default openProjectsSections;
