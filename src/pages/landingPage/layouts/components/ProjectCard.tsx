import "./ProjectCard.scss";

export default function ProjectCard() {
	return (
		<div className={`white-panel ProjectCard_container`}>
			<div className={`section-heading-text`}>Example Project: Dog Bark Detection</div>
			<div className={`ProjectCard_labels`}>
				<label className={`btn btn-solid`}>94.3% Accuracy</label>
				<label className={`btn btn-solid`}>97.6% True Positive Rate</label>
				<label className={`btn btn-solid`}>3sec in 24hr False Positive Rate</label>
			</div>
			<div className={`regular-text grey-text`}>
				An AnalogML model that detects the sound of dog bark for deployment in the outdoor context. It is
				trained on a near and far field dataset of dog barks of common American dog breeds. It employs 4 analog
				features and uses a 2-layer neural network.
			</div>
			<div className={`ProjectCard_button`}>
				<button className={`btn btn-outline`}>Open Project</button>
			</div>
		</div>
	);
}
