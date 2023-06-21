import "./App.scss";
import {Sidebar} from "./components/Sidebar/Sidebar";
import React from "react";
import {NavRegion} from "./components/NavRegion/NavRegion";
import openProjectsSections from "./components/NavRegion/mockData/openedProject";
import {ProjectsRegion} from "./components/ProjectsRegion/ProjectsRegion";
import {allProjects} from "./components/ProjectsRegion/allProjects";
import {newProjectSection} from "./components/NavRegion/mockData/newProject";

function App() {

    return (
        <div className={"App_container"}>
            <Sidebar
                logo="AnalogML Connect"
                sideRegion={[
                    // {
                    //     heading: "Projects",
                    //     region: <ProjectsRegion projects={allProjects} />
                    // },
                    // {
                    //     heading: "Project",
                    //     region: <NavRegion navSections={newProjectSection} />
                    // },
                    {
                        heading: "Project",
                        region: <NavRegion navSections={openProjectsSections} />
                    },
                ]
                }
            />
            <div className={"xlight-panel content-container App_Content"}>
            </div>
        </div>
    );
}

export default App;
