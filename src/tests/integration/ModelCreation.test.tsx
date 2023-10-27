import { describe } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, screen, within } from "@testing-library/react";
import { when } from "jest-when";
import { invoke } from "@tauri-apps/api/tauri";
import { renderWithProviders, testIds } from "../test-utils";
import { routes as appRoutes } from "../../App";
import { BASE_ROUTE } from "../../routes";
import { mockProjects } from "../mockdata/allProjects";
import React from "react";
import { getModelCreationPageTabs } from "../../pages/modelCreationPage/modelCreationPageTabs";
import { pageTabsActiveClass } from "../../components/pageTabs/PageTabs";
import { mockReactFlow } from "../mockdata/mockReactFlow";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";

const getPageElements = () => {
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

const verifyPageHeading = (expectedPageHeading: string, actualPageHeading: HTMLElement) => {
	expect(within(screen.getByTestId(testIds.contentHeading)).getByText(expectedPageHeading)).toBeInTheDocument();
};

const verifyPageTabLinkIsActive = (actualPageTabLinks: HTMLElement) => {
	expect(within(actualPageTabLinks).getByTestId(testIds.pageTabLinkLabel)).toHaveClass(pageTabsActiveClass);
};

const verifyPageTabLabels = (expectedPageTabLabels: string[], actualPageTabLabels: HTMLElement[]) => {
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

const verifyFooterButtons = (expectedPrevBtnText: string, actualPrevBtn: HTMLElement) => {
	expect(actualPrevBtn).toHaveTextContent(expectedPrevBtnText);
};

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
		const projects: ProjectDetails[] = mockProjects;

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
			getPageElements());

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
			getPageElements());

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
			getPageElements());

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
			getPageElements());

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
			getPageElements());

		// ASSERT - 5
		verifyPageHeading(expectedPageHeadings[page], actualPageHeading);
		verifyPageTabLinkIsActive(actualPageTabLinks[page]);
		verifyPageTabLabels(expectedPageTabLabels, actualPageTabLabels);
		verifyFooterButtons(expectedPrevBtnTexts[page], actualPrevBtn);
		verifyFooterButtons(expectedNextBtnTexts[page], actualNextBtn);
	});
});
