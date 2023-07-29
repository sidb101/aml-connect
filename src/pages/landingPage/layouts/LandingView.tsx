import { LandingPageHeader } from "./components/LandingPageHeader";
import "./LandingView.scss";
import Header from "../../../components/header/Header";
import ProjectCard, { type ProjectCardT } from "./components/ProjectCard";

const projectCards: ProjectCardT[] = [
	{
		projectTitle: "Example Project: Dog Bark Detection",
		projectLabel: ["94.3% Accuracy", "97.6% True Positive Rate", "3sec in 24hr False Positive Rate"],
		projectDescription:
			"An AnalogML model that detects the sound of dog bark for deployment in the outdoor context. It is " +
			"trained on a near and far field dataset of dog barks of common American dog breeds. It employs 4 analog " +
			"features and uses a 2-layer neural network.",
	},
	{
		projectTitle: "Alexa Wakeword Detection",
		projectLabel: ["94.3% Accuracy", "97.6% True Positive Rate", "3sec in 24hr False Positive Rate"],
		projectDescription:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Vulputate enim nulla aliquet porttitor lacus luctus. Ridiculus mus mauris vitae ultricies leo. In massa tempor nec feugiat nisl pretium. Ac turpis egestas maecenas pharetra convallis.",
	},

	{
		projectTitle: "Glass Break Detection",
		projectLabel: ["1st Label", "2nd Label", "3rd Label", "4th Label", "5th Label", "6th Label"],
		projectDescription:
			"Ultricies mi eget mauris pharetra. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. In fermentum posuere urna nec tincidunt praesent semper feugiat. Etiam tempor orci eu lobortis elementum. Lorem mollis aliquam ut porttitor leo. Euismod elementum nisi quis eleifend.",
	},
	{
		projectTitle: "Lorem ipsum dolor",
		projectLabel: ["1st Label", "2nd Label"],
		projectDescription:
			"Ultricies mi eget mauris pharetra. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. In fermentum posuere urna nec tincidunt praesent semper feugiat. Etiam tempor orci eu lobortis elementum. Lorem mollis aliquam ut porttitor leo. Euismod elementum nisi quis eleifend.",
	},

	{
		projectTitle: "Vulputate enim nulla",
		projectLabel: ["1st Label"],
		projectDescription:
			"Ultricies mi eget mauris pharetra. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. In fermentum posuere urna nec tincidunt praesent semper feugiat. Etiam tempor orci eu lobortis elementum. Lorem mollis aliquam ut porttitor leo. Euismod elementum nisi quis eleifend.",
	},
	{
		projectTitle: "Ligula ullamcorper",
		projectLabel: [],
		projectDescription:
			"Ultricies mi eget mauris pharetra. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. In fermentum posuere urna nec tincidunt praesent semper feugiat. Etiam tempor orci eu lobortis elementum. Lorem mollis aliquam ut porttitor leo. Euismod elementum nisi quis eleifend.",
	},
];

export type LandingPageViewT = {
	data?: string;
};

const LandingView = (props: LandingPageViewT) => {
	return (
		<>
			<Header headerTitle={"Projects"} element={<LandingPageHeader />} />
			<div className={`body-content-container-no-footer`}>
				<div className={`main-content-container`}>
					<div className={`LandingView_container`}>
						{projectCards.map((projectCard: ProjectCardT, index: number) => (
							<ProjectCard key={index} projectCard={projectCard} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingView;
