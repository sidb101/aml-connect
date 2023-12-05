import React, { type PropsWithChildren } from "react";
// import "@testing-library/jest-dom";
import type { RenderOptions } from "@testing-library/react";
import { render, screen, waitFor, within } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { AppStore, RootState } from "../redux/store";
import { setupStore } from "../redux/store";
import type { RouteObject } from "react-router-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { pageTabsActiveClass } from "../components/pageTabs/PageTabs";

/**
 * This module will define methods that can be used for performing testing with
 * React Template Library (RTL)
 */

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
//eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
	routes?: RouteObject[];
	initialEntries?: string[]; //routes that are needed to be in the history of the router (for testing going back etc.)
	initialIndex?: number; //index of the entry to start with
}

export function renderWithProviders(
	routes: RouteObject[], //the routes that would govern the app.
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		initialEntries = ["/"], //default entry is just home page
		initialIndex = initialEntries.length - 1, //default is the last element in the history stack
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren): React.JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}

	//Create a router that would render the given UI to the specified route
	const memoryRouter = createMemoryRouter(routes, {
		initialEntries,
		initialIndex,
	});

	// Return an object with the store and all of RTL's query functions
	return {
		store,
		...render(<RouterProvider router={memoryRouter} />, { wrapper: Wrapper, ...renderOptions }),
	};
}

/**
 * Will give the regex corresponding to the exact (case-sensitive) string matching.
 * Mostly used for asserts
 * @param text: Text to get regex for.
 * @return The regex corresponding to exact string (case-sensitive)
 */
export function getExactText(text: string) {
	return new RegExp(`^${text}$`);
}

/**
 * Common verification methods
 */

export const getPageElements = async () => {
	//Wait for all the elements to be stable after redux state update has happened
	await waitFor(() => {
		screen.getByTestId(testIds.contentHeading);
	});
	const actualPageHeading = screen.getByTestId(testIds.contentHeading);
	const actualPageTabLinks = screen.getAllByTestId(testIds.pageTabLink);
	const actualPageTabLabels = screen.getAllByTestId(testIds.pageTabLinkLabel);
	const actualPrevBtn = screen.getByTestId(testIds.prevBtn);
	const actualNextBtn = screen.getByTestId(testIds.nextBtn);

	return {
		actualPageHeading,
		actualPageTabLinks,
		actualPageTabLabels,
		actualPrevBtn,
		actualNextBtn,
	};
};

export const verifyPageHeading = (expectedPageHeading: string, actualPageHeading: HTMLElement) => {
	expect(actualPageHeading).toHaveTextContent(expectedPageHeading);
};

export const verifyPageTabLinkIsActive = (actualPageTabLinks: HTMLElement) => {
	expect(within(actualPageTabLinks).getByTestId(testIds.pageTabLinkLabel)).toHaveClass(pageTabsActiveClass);
};

export const verifyPageTabLabels = (expectedPageTabLabels: string[], actualPageTabLabels: HTMLElement[]) => {
	if (expectedPageTabLabels.length !== actualPageTabLabels.length) {
		fail("Mismatch in the length of expected and actual page tab labels.");
		return;
	}

	expectedPageTabLabels.forEach((label, index) => {
		if (actualPageTabLabels[index].textContent === "") {
			fail(`Empty Label Found in Page Tab at index: ${index}`);
		} else {
			expect(actualPageTabLabels[index]).toHaveTextContent(label);
		}
	});
};

export const verifyFooterButtons = (expectedPrevBtnText: string, actualPrevBtn: HTMLElement) => {
	expect(actualPrevBtn.textContent).toBe(expectedPrevBtnText);
};

/******** Various testIds *******/

export const testIds = {
	logo: "logo",

	sideBar: "side-test",
	projectLinks: "project-link",
	navHeading: "nav-heading",
	navLinks: "nav-links",
	navLinkLabels: "nav-link-labels",
	contentHeading: "content-heading",
	errorPage: "error-page",

	//Data Setup
	accordion: "accordion-test",
	accordionHeaderContainer: "accordion-head-container",
	accordionHeader: "accordion-head",
	accordionBody: "accordion-body",
	audioTableBody: "audio-table-body",

	trainingRadioBtn: "training-radio-btn",
	testingRadioBtn: "testing-radio-btn",
	validationRadioBtn: "validation-radio-btn",
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

	// Display cards
	displayCardLinks: "display-card-links",

	// Project Form
	projectNameInput: "new-project-name-input",
	projectDescriptionInput: "new-project-description-input",
	projectFormSubmitBtn: "project-form-submit-btn",

	spinner: "spinner",
};
