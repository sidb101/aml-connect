import {INavSection} from "../NavSection/NavSection";


export const newProjectSection : INavSection[] = [
    {
        heading: "New Project",
        isOpen: true,
        navLinks: [
            {
                label: "Overview",
                route: "",
                isEnabled: true,
                isSelected: true
            },
            {
                label: "Data Hub",
                route: "",
                isEnabled: true
            },
            {
                label: "Model Creation",
                route: "",
                isEnabled: true
            },
            {
                label: "Results",
                route: "",
                isEnabled: true
            },
            {
                label: "Send to Hardware",
                route: "",
                isEnabled: true
            }
        ],
        selectedIndex: 0
    }
];