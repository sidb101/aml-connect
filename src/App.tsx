import "./App.scss";
import { Sidebar } from "./components/sidebar/Sidebar";
import allProjectsSection from "./components/sidebar/mockData/allProjects";
import {StoryContent} from "./components/storybook/StoryContent";
import {StoryNav} from "./components/storybook/StoryNav";

function App() {

    return (
        <div className={"container"}>
            <Sidebar 
                logo="AnalogML Connect"
                sideSections={allProjectsSection}    
            />
        </div>
    );
}

export default App;
