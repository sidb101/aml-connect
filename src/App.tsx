import "./App.scss";
import {StoryContent} from "./components/storybook/StoryContent";
import {StoryNav} from "./components/storybook/StoryNav";

function App() {
    return (
        <div className={"container"}>
            <StoryNav/>
            <StoryContent/>
        </div>
    );
}

export default App;
