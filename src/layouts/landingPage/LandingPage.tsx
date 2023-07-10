import { Header } from "./components/Header";
import "./LandingPage.scss";
import { ExampleProject } from "./components/ExampleProject";

export const LandingPage = () => {
	return (
		<>
			<Header />
			<ExampleProject projectName="Example Project: Dog Bark Detection" />
			<ExampleProject projectName="Glass Break Detection" />
			<ExampleProject projectName="Alexa Voice" />
		</>
	);
};
