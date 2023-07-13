import "./App.scss";
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

const App = () => <RouterProvider router={router} />;

/** Exporting the routes to use them in testing as well **/
export const routes = createRoutesFromElements(
	<Route path={BASE_ROUTE} element={<Root />} errorElement={<ErrorPage />}>
		{/* TODO: Have Error Element for just the Outlet, not whole Root component */}

		<Route index={true} element={<LandingPage />} />
		<Route path={OVERVIEW_ROUTE} element={<OverviewPage />} />
		<Route path={DATA_HUB_ROUTE} element={<DataSetupPage />} />
		<Route path={MODEL_CREATION_ROUTE} element={<ModelCreationPage />} />
		<Route path={RESULTS_ROUTE} element={<ResultsPage />} />
		<Route path={SEND_TO_HARDWARE_ROUTE} element={<SendToHardwarePage />} />
	</Route>
);

const router = createBrowserRouter(routes);

export default App;

// const App = () => (
// 	<div className={`App_container`}>
// 		<div className={`App_sidebarContainer`}>
// 			<Sidebar
// 				logo="AnalogML Connect"
// 				sideRegion={[
// 					/** Various states of the Navbar. Uncomment the one that you want to choose  **/
//
// 					// {
// 					//     heading: 'Projects',
// 					//     region: <ProjectsRegion projects={allProjects} />
// 					// },
// 					// {
// 					//     heading: 'Project',
// 					//     region: <NavRegion navSections={newProjectSection} />
// 					// },
// 					{
// 						heading: "Project",
// 						region: <NavRegion navSections={openProjectsSections} />,
// 					},
// 				]}
// 			/>
// 		</div>
// 		<div className={`xlight-panel content-container`}>
// 			<LandingPage />
// 		</div>
// 	</div>
// );
