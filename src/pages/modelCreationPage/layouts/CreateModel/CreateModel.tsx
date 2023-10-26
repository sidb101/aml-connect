import CreateModelView from "./CreateModelView";
import { type ModelCreationPageContextT, useModelCreationContext } from "../../ModelCreationPage";
import { useEffect } from "react";
import { dataVizRoute, neuralNetworkRoute } from "../../../../routes";
import { useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/ProjectsSlice";

export type ModelPageT = {
	data?: string;
};

const CreateModel = (props: ModelPageT) => {
	const { setHeading, setFooter }: ModelCreationPageContextT = useModelCreationContext();
	const projectSlug = useAppSelector(selectCurrentProjectSlug);

	//Change the headers and footers of Model Creation as per the current view
	useEffect(() => {
		setHeading("Create Model");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
			nextBtn: { label: "Neural Networks", route: neuralNetworkRoute(projectSlug) },
		}));
	}, [projectSlug]);

	return (
		<>
			<CreateModelView />
		</>
	);
};

export default CreateModel;
