import "./App.scss";
import { Sidebar } from "./components/sidebar/Sidebar";
import allProjectsSection from "./components/sidebar/mockData/allProjects";
import {StoryContent} from "./components/storybook/StoryContent";
import {StoryNav} from "./components/storybook/StoryNav";
import React from "react";

function App() {

    return (
        <div className={"App_container"}>
            <Sidebar
                logo="AnalogML Connect"
                sideSections={allProjectsSection}
            />
            <div className={"xlight-panel content-container App_Content"}>
                Super Extra looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Content
            </div>
        </div>
    );
}

export default App;
