import {Header} from "./components/Header";
import {StoryNav} from "../../components/storybook/StoryNav";
import "./LandingPage.scss";
import {ExampleProject} from "./components/ExampleProject";

export const LandingPage = () => {
	return (
		<div className={`container`}>
			<StoryNav />
			<div className={`xlight-panel content-container`}>
				<Header />
				<ExampleProject projectName="Example Project: Dog Bark Detection" />
				<ExampleProject projectName="Glass Break Detection" />
				<ExampleProject projectName="Alexa Voice" />
			</div>
		</div>
	);
};