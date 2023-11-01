import { describe } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { when } from "jest-when";
import { invoke } from "@tauri-apps/api/tauri";
import type { BasicProjectDataT } from "../../redux/slices/GeneralSlice";
import {
	getPageElements,
	renderWithProviders,
	testIds,
	verifyFooterButtons,
	verifyPageHeading,
	verifyPageTabLabels,
	verifyPageTabLinkIsActive,
} from "../test-utils";
import { routes as appRoutes } from "../../App";
import { BASE_ROUTE } from "../../routes";
import { mockProjects } from "../mockdata/allProjectsMock";
import React from "react";
import { getDataHubPageTabs } from "../../pages/dataHubPage/dataHubPageTabs";

describe("Testing the Data Hub navigation", () => {
	const mockInvoke = invoke as jest.MockedFunction<typeof invoke>;
	const routes = appRoutes;

	test("Data Hub: Test 1: Testing the data hub page exists, and the page tabs exist on the data hub page", () => {
		// ARRANGE (from where to start the test)

		// -> should start with empty store
		const storeState = {};
		const projects: BasicProjectDataT[] = mockProjects;

		// -> mock the response from backend
		when(mockInvoke).calledWith("getProjects").mockResolvedValue(projects);

		// -> Start this app with this store state and this ("/") as the current route
		renderWithProviders(routes, {
			preloadedState: storeState,
			initialEntries: [BASE_ROUTE],
		});

		// -> Get all the project links in the sidebar with a given test ID
		// NOTE: getAllByTestId() does not need the await keyword
		// NOTE: DO NOT WRITE testIDs everywhere, only where needed
		const sideBarLinks = screen.getAllByTestId(testIds.projectLinks);

		// -> Click the first sidebar link
		fireEvent.click(sideBarLinks[0]);

		// -> Get the nav links in the sidebar e.g. "Overview, Data Hub, etc."
		// NOTE: findAllByTestId() needs the await keyword
		const navLinks = screen.getAllByTestId(testIds.navLinks);

		const expectedPageTabLinks = getDataHubPageTabs(projects[0].slug);
		const expectedPageTabLabels = expectedPageTabLinks.map((tab) => tab.label);
		const expectedPageHeadings = [
			projects[0].name + " > Data Hub > " + expectedPageTabLabels[0],
			projects[0].name + " > Data Hub > " + expectedPageTabLabels[1],
		];
		const expectedPrevBtnTexts = ["Overview", expectedPageTabLabels[0]];
		const expectedNextBtnTexts = [expectedPageTabLabels[1], "Create Model"];

		let page: number;

		let actualPageHeading: HTMLElement;
		let actualPageTabLinks: HTMLElement[];
		let actualPageTabLabels: HTMLElement[];
		let actualPrevBtn: HTMLElement;
		let actualNextBtn: HTMLElement;

		// -----------------------------------------------------------------------------------
		// ACT - 1: Click the "Data Hub" link in the sidebar
		// -----------------------------------------------------------------------------------
		page = 0;
		fireEvent.click(navLinks[1]);
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			getPageElements());

		// ASSERT - 1
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);

		// -----------------------------------------------------------------------------------
		// ACT - 2: Click the "Visualize Data" in the page tabs up the top of the page
		// -----------------------------------------------------------------------------------
		page = 1;
		fireEvent.click(actualPageTabLinks[page]);
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			getPageElements());

		// ASSERT - 2
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);

		// // -----------------------------------------------------------------------------------
		// // ACT - 3: Click the "Data Setup" in the page tabs up the top of the page
		// // -----------------------------------------------------------------------------------
		page = 0;
		fireEvent.click(actualPageTabLinks[page]);
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			getPageElements());

		// ASSERT - 3
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);

		// // -----------------------------------------------------------------------------------
		// // ACT - 4: Click the next button in the footer of the page
		// // -----------------------------------------------------------------------------------
		page = 1;
		fireEvent.click(screen.getByTestId(testIds.nextBtn));
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			getPageElements());

		// ASSERT - 4
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);

		// // -----------------------------------------------------------------------------------
		// // ACT - 5: Click the previous button in the footer of the page
		// // -----------------------------------------------------------------------------------
		page = 0;
		fireEvent.click(screen.getByTestId(testIds.prevBtn));
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			getPageElements());

		// ASSERT - 5
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);
	});
});
