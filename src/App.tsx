import "./App.scss";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {allProjects} from "./components/ProjectsRegion/allProjects";
import React from "react";
import {ProjectsRegion} from "./components/ProjectsRegion/ProjectsRegion";
import {NavRegion} from "./components/NavRegion/NavRegion";
import {newProjectSection} from "./components/NavRegion/mockData/newProject";
import openProjectsSections from "./components/NavRegion/mockData/openedProject";

function App() {

    return (
        <div className={"App_container"}>
            <Sidebar
                logo="Analog ML Connect"
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
                {/*Super Extra looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Content*/}
            </div>
        </div>
    );
}

export default App;
