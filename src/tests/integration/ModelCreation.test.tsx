import { describe } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { when } from "jest-when";
import { invoke } from "@tauri-apps/api/tauri";
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
import { mockReactFlow } from "../mockdata/mockReactFlow";
import { allElements, transformedElements } from "../mockdata/allElementsMock";
import remoteService from "../../service/RemoteService/RemoteService";
import type { ShallowProjectDetails } from "../../redux/slices/ProjectSlice";
import { getModelCreationPageTabs } from "../../pages/modelCreationPage/modelCreationPageLabels";

jest.mock("../../service/RemoteService/RemoteService");

beforeEach(() => {
	mockReactFlow();
});

describe("Testing the Model Creation navigation", () => {
	const mockInvoke = invoke as jest.MockedFunction<typeof invoke>;
	const routes = appRoutes;

	test("Model Creation: Test 1: Testing the model creation page exists, and the page tabs exist on the model creation page", async () => {
		// ARRANGE (from where to start the test)

		// -> should start with empty store
		const storeState = {};
		const projects: ShallowProjectDetails[] = mockProjects;

		// -> mock the response from backend
		when(remoteService.getAllProjects).mockResolvedValue(projects);
		when(remoteService.getAllElements).calledWith().mockResolvedValue(transformedElements);

		// -> Start this app with this store state and this ("/") as the current route
		renderWithProviders(routes, {
			preloadedState: storeState,
			initialEntries: [BASE_ROUTE],
		});

		// -> Get all the project links in the sidebar with a given test ID
		// NOTE: getAllByTestId() does not need the await keyword
		// NOTE: DO NOT WRITE testIDs everywhere, only where needed
		const sideBarLinks = await screen.findAllByTestId(testIds.projectLinks);

		// -> Click the first sidebar link
		fireEvent.click(sideBarLinks[0]);

		// -> Get the nav links in the sidebar e.g. "Overview, Data Hub, etc."
		// NOTE: findAllByTestId() needs the await keyword
		const navLinks = screen.getAllByTestId(testIds.navLinks);

		const expectedPageTabLinks = getModelCreationPageTabs(projects[0].slug);
		const expectedPageTabLabels = expectedPageTabLinks.map((tab) => tab.label);
		const expectedPageHeadings = [
			projects[0].name + " > Model Creation > " + expectedPageTabLabels[0],
			projects[0].name + " > Model Creation > " + expectedPageTabLabels[1],
		];
		const expectedPrevBtnTexts = ["Visualize Data", expectedPageTabLabels[0]];
		const expectedNextBtnTexts = [expectedPageTabLabels[1], "Results"];

		let page: number;

		let actualPageHeading: HTMLElement;
		let actualPageTabLinks: HTMLElement[];
		let actualPageTabLabels: HTMLElement[];
		let actualPrevBtn: HTMLElement;
		let actualNextBtn: HTMLElement;

		// -----------------------------------------------------------------------------------
		// ACT - 1: Click the "Model Creation" link in the sidebar
		// -----------------------------------------------------------------------------------
		page = 0;
		fireEvent.click(navLinks[2]);
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			await getPageElements());
		// ASSERT - 1
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);

		// -----------------------------------------------------------------------------------
		// ACT - 2: Click the "Neural Networks" in the page tabs up the top of the page
		// -----------------------------------------------------------------------------------
		page = 1;
		fireEvent.click(actualPageTabLinks[page]);

		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			await getPageElements());

		// ASSERT - 2
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);

		// -----------------------------------------------------------------------------------
		// ACT - 3: Click the "Create Model" in the page tabs up the top of the page
		// -----------------------------------------------------------------------------------
		page = 0;
		fireEvent.click(actualPageTabLinks[page]);
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			await getPageElements());

		// ASSERT - 3
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);

		// -----------------------------------------------------------------------------------
		// ACT - 4: Click the next button in the footer of the page
		// -----------------------------------------------------------------------------------
		page = 1;
		fireEvent.click(screen.getByTestId(testIds.nextBtn));
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			await getPageElements());

		// ASSERT - 4
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);

		// -----------------------------------------------------------------------------------
		// ACT - 5: Click the previous button in the footer of the page
		// -----------------------------------------------------------------------------------
		page = 0;
		fireEvent.click(screen.getByTestId(testIds.prevBtn));
		({ actualPageHeading, actualPageTabLinks, actualPageTabLabels, actualPrevBtn, actualNextBtn } =
			await getPageElements());

		// ASSERT - 5
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);
	});
});

describe("Testing the Canvas Interaction", () => {
	const routes = appRoutes;

	test("Model Creation: Test 2: Testing Add Element to Canvas", async () => {
		// ARRANGE (from where to start the test)

		// -> should start with empty store
		const storeState = {};

		// -> mock the response from backend
		when(remoteService.getAllProjects).mockResolvedValue(mockProjects);

		// -> Start this app with this store state and this ("/") as the current route
		renderWithProviders(routes, {
			preloadedState: storeState,
			initialEntries: [BASE_ROUTE],
		});

		// -> Get all the project links in the sidebar with a given test ID
		// NOTE: getAllByTestId() does not need the await keyword
		// NOTE: DO NOT WRITE testIDs everywhere, only where needed
		const sideBarLinks = await screen.findAllByTestId(testIds.projectLinks);

		// -> Click the first sidebar link
		fireEvent.click(sideBarLinks[0]);

		// -> Get the nav links in the sidebar e.g. "Overview, Data Hub, etc."
		// NOTE: findAllByTestId() needs the await keyword
		const navLinks = screen.getAllByTestId(testIds.navLinks);

		// Click the "Model Creation" link in the sidebar
		fireEvent.click(navLinks[2]);

		// -----------------------------------------------------------------------------------
		// ACT: Add Some Element
		// -----------------------------------------------------------------------------------

		// Find the button and click it to show dropdown.
		await waitFor(() => {
			const addButton = screen.getByText("Add");
			fireEvent.click(addButton);
		});

		// Assuming the dropdown is rendered.
		const dropdown = screen.getByRole("listbox");
		const { getByText } = within(dropdown);

		// Click an option in the dropdown.
		fireEvent.click(getByText(allElements[1].typeName));

		// -----------------------------------------------------------------------------------
		// ASSERT
		// -----------------------------------------------------------------------------------
		const elements = screen.getAllByText(allElements[1].typeName);
		expect(elements[0]).toBeInTheDocument();
	});
});
