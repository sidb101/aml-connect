import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { projectActions, selectCurrentProjectName } from "../../redux/slices/ProjectSlice";
import Header from "../../components/header/Header";
import NeuralNetworksView from "./layouts/NeuralNetworksView";
import Footer from "../../components/footer/Footer";
import { createModelRoute, dataVizRoute } from "../../routes";

function NeuralNetworksPage() {
	const dispatch = useAppDispatch();
	const { projectSlug = "" } = useParams();
	const currentProjectName = useAppSelector(selectCurrentProjectName);

	useEffect(() => {
		dispatch(projectActions.openProject(projectSlug));
	}, [projectSlug]);

	return (
		projectSlug &&
		currentProjectName && (
			<>
				<Header headerTitle={`${currentProjectName} > Neural Networks`} />
				<NeuralNetworksView />
				<Footer
					footerBtnGroup={{
						prevBtn: {
							label: "Visualize Data",
							route: dataVizRoute(projectSlug),
						},
						nextBtn: {
							label: "Model Creation",
							route: createModelRoute(projectSlug),
						},
					}}
				/>
			</>
		)
	);
}

export default NeuralNetworksPage;
