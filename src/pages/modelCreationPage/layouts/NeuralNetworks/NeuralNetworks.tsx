import NeuralNetworksView from "./NeuralNetworksView";

export type NeuralNetworksPageT = {
	data?: string;
};

const NeuralNetworks = (props: NeuralNetworksPageT) => {
	return (
		<>
			<NeuralNetworksView />
		</>
	);
};

export default NeuralNetworks;
