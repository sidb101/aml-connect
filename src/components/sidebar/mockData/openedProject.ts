import { ISideSection } from "./Sidebar";

const openProjectsSections : ISideSection[] = [
    {
        label: "Glass Break Detection",
        isOpen: true,
        sideLinks : [
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
    },
    {
        label: "Alexa Wakeword Detection",
        isOpen: false,
        sideLinks : [
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