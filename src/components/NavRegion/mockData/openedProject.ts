import {INavSection} from "../NavSection/NavSection";


const openProjectsSections : INavSection[] = [
    {
        heading: "Glass Break Detection",
        isOpen: true,
        navLinks : [
            {
                label: "Overview"
            },
            {
                label: "Data Hub"
            },
            {
                label: "Model Creation"
            },
            {
                label: "Results"
            },
            {
                label: "Send to Hardware"
            }
        ],
        selectedIndex: 0
    }
];

export default openProjectsSections;