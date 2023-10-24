import "./App.scss";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	BASE_ROUTE,
	DATA_HUB_ROUTE,
	DATA_SETUP_ROUTE,
	DATA_VIZ_ROUTE,
	MODEL_CREATION_ROUTE,
	CREATE_MODEL_ROUTE,
	NEURAL_NETWORK_ROUTE,
	OVERVIEW_ROUTE,
	RESULTS_ROUTE,
	SEND_TO_HARDWARE_ROUTE,
	RESULTS_ANALYSIS_ROUTE,
	RESULTS_COMPARISON_ROUTE,
} from "./routes";
import Root from "./pages/Root";
import ErrorPage from "./pages/errorPage/ErrorPage";
import LandingPage, { landingPageLoader } from "./pages/landingHubPage/layouts/LandingPage/LandingPage";
import OverviewPage from "./pages/overviewPage/OverviewPage";
import DataHubPage from "./pages/dataHubPage/DataHubPage";
import DataSetup from "./pages/dataHubPage/layouts/DataSetup/DataSetup";
import DataViz from "./pages/dataHubPage/layouts/DataViz/DataViz";
import ModelCreationPage from "./pages/modelCreationPage/ModelCreationPage";
import CreateModel from "./pages/modelCreationPage/layouts/CreateModel/CreateModel";
import NeuralNetworks from "./pages/modelCreationPage/layouts/NeuralNetworks/NeuralNetworks";
import ResultsPage from "./pages/resultsPage/ResultsPage";
import ResultsAnalysis from "./pages/resultsPage/layouts/ResultsAnalysis/ResultsAnalysis";
import ResultsComparison from "./pages/resultsPage/layouts/ResultsComparison/ResultsComparison";
import SendToHardwarePage from "./pages/sendToHardwarePage/SendToHardwarePage";
import { createNewProjectAction } from "./pages/landingHubPage/layouts/CreateNewProjectPage/CreateNewProject";
import CreateNewProject from "./pages/landingHubPage/layouts/CreateNewProjectPage/CreateNewProject";
import LandingHubPage from "./pages/landingHubPage/LandingHubPage";

export const routes = [
	{
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: BASE_ROUTE,
				element: <LandingHubPage />,
				children: [
					{
						path: "",
						element: <LandingPage />,
						loader: landingPageLoader,
						errorElement: <ErrorPage />,
					},
					{
						path: "new",
						element: <CreateNewProject />,
						action: createNewProjectAction,
					},
				],
			},
			{
				path: OVERVIEW_ROUTE,
				element: <OverviewPage />,
			},
			{
				path: DATA_HUB_ROUTE,
				element: <DataHubPage />,
				children: [
					{
						path: DATA_SETUP_ROUTE,
						element: <DataSetup />,
					},
					{
						path: DATA_VIZ_ROUTE,
						element: <DataViz />,
					},
				],
			},
			{
				path: MODEL_CREATION_ROUTE,
				element: <ModelCreationPage />,
				children: [
					{
						path: CREATE_MODEL_ROUTE,
						element: <CreateModel />,
					},
					{
						path: NEURAL_NETWORK_ROUTE,
						element: <NeuralNetworks />,
					},
				],
			},
			{
				path: RESULTS_ROUTE,
				element: <ResultsPage />,
				children: [
					{
						path: RESULTS_ANALYSIS_ROUTE,
						element: <ResultsAnalysis />,
					},
					{
						path: RESULTS_COMPARISON_ROUTE,
						element: <ResultsComparison />,
					},
				],
			},
			{
				path: SEND_TO_HARDWARE_ROUTE,
				element: <SendToHardwarePage />,
			},
		],
	},
];

const router = createBrowserRouter(routes);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
