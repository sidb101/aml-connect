// import React, { type PropsWithChildren } from "react";
// import type { RenderOptions } from "@testing-library/react";
// import { render } from "@testing-library/react";
// import type { PreloadedState } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import type { AppStore, RootState } from "../redux/store";
// import { setupStore } from "../redux/store";
// import type { RouteObject } from "react-router-dom";
// import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
//
// /**
//  * This module will define methods that can be used for performing testing with
//  * React Template Library (RTL)
//  */
//
// // This type interface extends the default options for render from RTL, as well
// // as allows the user to specify other things such as initialState, store.
// //eslint-disable-next-line @typescript-eslint/consistent-type-definitions
// interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
// 	preloadedState?: PreloadedState<RootState>;
// 	store?: AppStore;
// 	routes?: RouteObject[];
// 	initialEntries?: string[]; //routes that are needed to be in the history of the router (for testing going back etc.)
// 	initialIndex?: number; //index of the entry to start with
// }
//
// export function renderWithProviders(
// 	routes: RouteObject[], //the routes that would govern the app.
// 	{
// 		preloadedState = {},
// 		// Automatically create a store instance if no store was passed in
// 		store = setupStore(preloadedState),
// 		initialEntries = ["/"], //default entry is just home page
// 		initialIndex = initialEntries.length - 1, //default is the last element in the history stack
// 		...renderOptions
// 	}: ExtendedRenderOptions = {}
// ) {
// 	function Wrapper({ children }: PropsWithChildren): React.JSX.Element {
// 		return <Provider store={store}>{children}</Provider>;
// 	}
//
// 	//Create a router that would render the given UI to the specified route
// 	const memoryRouter = createMemoryRouter(routes, {
// 		initialEntries,
// 		initialIndex,
// 	});
//
// 	// Return an object with the store and all of RTL's query functions
// 	return {
// 		store,
// 		...render(<RouterProvider router={memoryRouter} />, { wrapper: Wrapper, ...renderOptions }),
// 	};
// }
//
// /**
//  * Will give the regex corresponding to the exact (case-sensitive) string matching.
//  * Mostly used for asserts
//  * @param text: Text to get regex for.
//  * @return The regex corresponding to exact string (case-sensitive)
//  */
// export function getExactText(text: string) {
// 	return new RegExp(`^${text}$`);
// }
//
/******** Various testIds *******/

export const testIds = {
	sideBar: "side-test",
	projectLinks: "project-link",
	navHeading: "nav-heading",
	navLinks: "nav-links",
	navLinkLabels: "nav-link-labels",
	contentHeading: "content-heading",
	errorPage: "error-page",

	accordion: "accordion-test",
	accordionHeader: "accordion-head",
	accordionBody: "accordion-body",
	audioTableBody: "audio-table-body",

	importFilesBtn: "import-files-btn",
	importModalBody: "import-modal-body",
	browsePcLink: "browse-pc-link",
	modalImportFilesBtn: "modal-import-files-btn",

	// PageTabs Links
	pageTabLink: "page-tab-link",
	pageTabLinkLabel: "page-tab-label",

	// Footer buttons
	prevBtn: "previous-btn",
	nextBtn: "next-btn",
};
