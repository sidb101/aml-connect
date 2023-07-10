import React from "react";
import "./App.scss";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import {
	BASE_ROUTE,
	DATA_HUB_ROUTE,
	MODEL_CREATION_ROUTE,
	OVERVIEW_ROUTE,
	RESULTS_ROUTE,
	SEND_TO_HARDWARE_ROUTE,
} from "./routes";
import Root from "./pages/Root";
import LandingPage from "./pages/landingPage/LandingPage";
import OverviewPage from "./pages/overviewPage/OverviewPage";
import DataSetupPage from "./pages/dataSetupPage/DataSetupPage";
import ModelCreationPage from "./pages/modelCreationPage/ModelCreationPage";
import ResultsPage from "./pages/resultsPage/ResultsPage";
import SendToHardwarePage from "./pages/sendToHardwarePage/SendToHardwarePage";
import ErrorPage from "./pages/errorPage/ErrorPage";

const App = () => (
	<div className={"App_container"}>
		<RouterProvider router={router} />
	</div>
);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={BASE_ROUTE} element={<Root />} errorElement={<ErrorPage />}>
			{/* TODO: Have Error Element for just the Outlet, not whole Root component */}

			<Route index={true} element={<LandingPage />} />
			<Route path={OVERVIEW_ROUTE} element={<OverviewPage />} />
			<Route path={DATA_HUB_ROUTE} element={<DataSetupPage />} />
			<Route path={MODEL_CREATION_ROUTE} element={<ModelCreationPage />} />
			<Route path={RESULTS_ROUTE} element={<ResultsPage />} />
			<Route path={SEND_TO_HARDWARE_ROUTE} element={<SendToHardwarePage />} />
		</Route>
	)
);

export default App;
