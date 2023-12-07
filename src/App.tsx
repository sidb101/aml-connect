import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	BASE_ROUTE,
	CHECK_SEPARATION_ROUTE,
	CREATE_MODEL_ROUTE,
	DATA_HUB_ROUTE,
	DATA_SETUP_ROUTE,
	DATA_VIZ_ROUTE,
	MAKE_YOUR_NEURAL_NET_ROUTE,
	MODEL_CREATION_ROUTE,
	OVERVIEW_ROUTE,
	RESULTS_ANALYSIS_ROUTE,
	RESULTS_COMPARISON_ROUTE,
	RESULTS_ROUTE,
	RUN_SIMULATION_ROUTE,
	SEND_TO_HARDWARE_ROUTE,
	TRAIN_YOUR_NEURAL_NET_ROUTE,
} from "./routes";
import Root from "./pages/Root";
import LandingPage, { landingPageAction } from "./pages/landingHubPage/layouts/LandingPage/LandingPage";
import OverviewPage, { overviewPageAction } from "./pages/overviewPage/OverviewPage";
import DataHubPage from "./pages/dataHubPage/DataHubPage";
import ModelCreationPage from "./pages/modelCreationPage/ModelCreationPage";
import ResultsPage from "./pages/resultsPage/ResultsPage";
import SendToHardwarePage from "./pages/sendToHardwarePage/SendToHardwarePage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import DataSetup from "./pages/dataHubPage/layouts/DataSetup/DataSetup";
import DataViz from "./pages/dataHubPage/layouts/DataViz/DataViz";
import CreateModel from "./pages/modelCreationPage/layouts/CreateModel/CreateModel";
import ResultsAnalysis from "./pages/resultsPage/layouts/ResultsAnalysis/ResultsAnalysis";
import ResultsComparison from "./pages/resultsPage/layouts/ResultsComparison/ResultsComparison";
import LandingHubPage from "./pages/landingHubPage/LandingHubPage";
import CreateNewProjectPage, {
	createNewProjectPageAction,
} from "./pages/landingHubPage/layouts/CreateNewProjectPage/CreateNewProjectPage";
import RunSimulation from "./pages/modelCreationPage/layouts/RunSimulation/RunSimulation";
import CheckSeparation from "./pages/modelCreationPage/layouts/CheckSeparation/CheckSeparation";
import MakeNeuralNet from "./pages/modelCreationPage/layouts/MakeNeuralNet/MakeNeuralNet";
import TrainNeuralNet from "./pages/modelCreationPage/layouts/TrainNeuralNet/TrainNeuralNet";

/** Exporting the routes to use them in testing as well **/
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
						index: true,
						path: "",
						element: <LandingPage />,
						action: landingPageAction,
						errorElement: <ErrorPage />,
					},
					{
						path: "new",
						element: <CreateNewProjectPage />,
						action: createNewProjectPageAction,
						errorElement: <ErrorPage />,
					},
				],
			},
			{
				path: OVERVIEW_ROUTE,
				element: <OverviewPage />,
				action: overviewPageAction,
				errorElement: <ErrorPage />,
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
						path: CHECK_SEPARATION_ROUTE,
						element: <CheckSeparation />,
					},
					{
						path: MAKE_YOUR_NEURAL_NET_ROUTE,
						element: <MakeNeuralNet />,
					},
					{
						path: TRAIN_YOUR_NEURAL_NET_ROUTE,
						element: <TrainNeuralNet />,
					},
					{
						path: RUN_SIMULATION_ROUTE,
						element: <RunSimulation />,
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
