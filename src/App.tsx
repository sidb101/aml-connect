import "./App.scss";
import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
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
} from "./routes";
import Root from "./pages/Root";
import LandingPage from "./pages/landingPage/LandingPage";
import OverviewPage from "./pages/overviewPage/OverviewPage";
import DataHubPage from "./pages/dataHubPage/DataHubPage";
import ModelCreationPage from "./pages/modelCreationPage/ModelCreationPage";
import ResultsPage from "./pages/resultsPage/ResultsPage";
import SendToHardwarePage from "./pages/sendToHardwarePage/SendToHardwarePage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import DataSetup from "./pages/dataHubPage/layouts/DataSetup/DataSetup";
import DataViz from "./pages/dataHubPage/layouts/DataViz/DataViz";
import CreateModel from "./pages/modelCreationPage/layouts/CreateModel/CreateModel";
import NeuralNetworks from "./pages/modelCreationPage/layouts/NeuralNetworks/NeuralNetworks";

const App = () => <RouterProvider router={router} />;

/** Exporting the routes to use them in testing as well **/
export const routes = createRoutesFromElements(
	<Route path={BASE_ROUTE} element={<Root />} errorElement={<ErrorPage />}>
		{/* TODO: Have Error Element for just the Outlet, not whole Root component */}

		<Route index={true} element={<LandingPage />} />
		<Route path={OVERVIEW_ROUTE} element={<OverviewPage />} />
		<Route path={DATA_HUB_ROUTE} element={<DataHubPage />}>
			<Route path={DATA_SETUP_ROUTE} element={<DataSetup />} />
			<Route path={DATA_VIZ_ROUTE} element={<DataViz />} />
		</Route>
		<Route path={MODEL_CREATION_ROUTE} element={<ModelCreationPage />}>
			<Route path={CREATE_MODEL_ROUTE} element={<CreateModel />} />
			<Route path={NEURAL_NETWORK_ROUTE} element={<NeuralNetworks />} />
		</Route>
		<Route path={RESULTS_ROUTE} element={<ResultsPage />} />
		<Route path={SEND_TO_HARDWARE_ROUTE} element={<SendToHardwarePage />} />
	</Route>
);

const router = createBrowserRouter(routes);

export default App;
