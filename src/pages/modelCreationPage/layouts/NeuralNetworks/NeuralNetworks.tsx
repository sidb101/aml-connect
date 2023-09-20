import NeuralNetworksView from "./NeuralNetworksView";
import { type ModelCreationPageContextT, useModelCreationContext } from "../../ModelCreationPage";
import { useEffect } from "react";
import { modelCreationRoute, modelRoute, resultsRoute } from "../../../../routes";
import { useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/GeneralSlice";

export type NeuralNetworksPageT = {
	data?: string;
};

const NeuralNetworks = (props: NeuralNetworksPageT) => {
	const { setHeading, setFooter }: ModelCreationPageContextT = useModelCreationContext();
	const projectSlug = useAppSelector(selectCurrentProjectSlug);

	//Change the headers and footers of Model Creation as per the current view
	useEffect(() => {
		setHeading("Neural Networks");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "Create Model", route: modelRoute(projectSlug) },
			nextBtn: { label: "Results", route: resultsRoute(projectSlug) },
		}));
	}, [projectSlug]);

	return (
		<>
			<NeuralNetworksView />
		</>
	);
};

export default NeuralNetworks;
