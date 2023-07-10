import { StoryNav } from "../../components/storybook/StoryNav";
import { StoryContent } from "../../components/storybook/StoryContent";

export const ExamplePage = () => {
	return (
		<div className={"container"}>
			<StoryNav />
			<StoryContent />
		</div>
	);
};
