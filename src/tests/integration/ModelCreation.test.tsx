import { describe } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, screen, within } from "@testing-library/react";
import { when } from "jest-when";
import { invoke } from "@tauri-apps/api/tauri";
import type { BasicProjectDataT } from "../../redux/slices/GeneralSlice";
import { renderWithProviders, testIds } from "../test-utils";
import { routes as appRoutes } from "../../App";
import { BASE_ROUTE, CREATE_MODEL_ROUTE } from "../../routes";
import { mockProjects } from "../mockdata/allProjects";
import React from "react";
import { getModelCreationPageTabs } from "../../pages/modelCreationPage/modelCreationPageTabs";
import { pageTabsActiveClass } from "../../components/pageTabs/PageTabs";

/**
 * Performing test on basic Navigation Functionality
 */
describe("Testing the Model Creation navigation", () => {
	//mock the invoke method of backend module
	const mockInvoke = invoke as jest.MockedFunction<typeof invoke>;

	//define the routing for given test suite
	const routes = appRoutes;

	const expectedCreateModelBtns = ["Visualize Data", "Results"];

	test(
		"Model Creation: Test 1: Testing the model creation page exists, " +
			"and the page tabs exist on the model creation page",
		async () => {
			// ARRANGE (from where to start the test)
			// -> should start with empty store
			const storeState = {};

			// -> mock the response from backend
			const projects: BasicProjectDataT[] = mockProjects;
			when(mockInvoke).calledWith("getProjects").mockResolvedValue(projects);

			// -> Need to start from the base route
			const routeToRender = [BASE_ROUTE];

			// -> Start this app with this store state and this ("/") as the current route
			renderWithProviders(routes, {
				preloadedState: storeState,
				initialEntries: routeToRender,
			});

			// -> Get all the project links in the sidebar with a given test ID
			// NOTE: getAllByTestId() does not need the await keyword
			// NOTE: DO NOT WRITE testIDs everywhere, only where needed
			const sideBarLinks = screen.getAllByTestId(testIds.projectLinks);

			// -> Click the first sidebar link
			fireEvent.click(sideBarLinks[0]);

			// -> Get the nav links in the sidebar e.g. "Overview, Data Hub, etc."
			// NOTE: findAllByTestId() needs the await keyword
			const navLinks = await screen.findAllByTestId(testIds.navLinks);

			// ACT - 1
			// -> Click the "Model Creation" link
			fireEvent.click(navLinks[2]);

			// ASSERT - 1
			const pageTabLinks = await screen.findAllByTestId(testIds.pageTabLink);

			const expectedPageTabs = getModelCreationPageTabs(projects[0].slug);

			// Testing that the page tabs are what they should be
			pageTabLinks.forEach((pageTabLink, index) => {
				const pageTabLabel: string = expectedPageTabs[index].label;
				if (pageTabLabel === "") {
					fail("Empty Label Found in Page Tab.");
				} else {
					expect(pageTabLink).toHaveTextContent(pageTabLabel);
				}
			});

			// Testing the default selected tab in the page tabs
			expect(within(pageTabLinks[0]).getByTestId(testIds.pageTabLinkLabel)).toHaveClass(pageTabsActiveClass);

			// Testing the previous button in the footer is correct
			let prevBtn = screen.getByTestId(testIds.prevBtn);
			expect(prevBtn).toHaveTextContent(expectedCreateModelBtns[0]);

			// Testing the next button in the footer is correct
			let nextBtn = screen.getByTestId(testIds.nextBtn);
			expect(nextBtn).toHaveTextContent(expectedPageTabs[1].label);

			// Testing the page heading is correct i.e. X > Model Creation > Create Model
			expect(
				within(screen.getByTestId(testIds.contentHeading)).getByText(
					projects[0].name + " > Model Creation > " + expectedPageTabs[0].label
				)
			).toBeInTheDocument();

			// ACT - 2
			// -> Click "Neural Networks"
			fireEvent.click(pageTabLinks[1]);

			// ASSERT -2
			// -> Testing that the page tabs are what they should be
			pageTabLinks.forEach((pageTabLink, index) => {
				const pageTabLabel: string = expectedPageTabs[index].label;
				if (pageTabLabel === "") {
					fail("Empty Label Found in Page Tab.");
				} else {
					expect(pageTabLink).toHaveTextContent(pageTabLabel);
				}
			});

			// Testing the default selected tab in the page tabs
			expect(within(pageTabLinks[1]).getByTestId(testIds.pageTabLinkLabel)).toHaveClass(pageTabsActiveClass);

			// Testing the previous button in the footer is correct
			prevBtn = screen.getByTestId(testIds.prevBtn);
			expect(prevBtn).toHaveTextContent(expectedPageTabs[0].label);

			// Testing the next button in the footer is correct
			nextBtn = screen.getByTestId(testIds.nextBtn);
			expect(nextBtn).toHaveTextContent(expectedCreateModelBtns[1]);

			// Testing the page heading is correct i.e. X > Model Creation > Create Model
			expect(
				within(screen.getByTestId(testIds.contentHeading)).getByText(
					projects[0].name + " > Model Creation > " + expectedPageTabs[1].label
				)
			).toBeInTheDocument();

			// ACT - 3
			// -> Click previous button
			fireEvent.click(prevBtn);

			// ASSERT - 3
			// -> Testing that the page tabs are what they should be
			// Testing that the page tabs are what they should be
			pageTabLinks.forEach((pageTabLink, index) => {
				const pageTabLabel: string = expectedPageTabs[index].label;
				if (pageTabLabel === "") {
					fail("Empty Label Found in Page Tab.");
				} else {
					expect(pageTabLink).toHaveTextContent(pageTabLabel);
				}
			});

			// Testing the default selected tab in the page tabs
			expect(within(pageTabLinks[0]).getByTestId(testIds.pageTabLinkLabel)).toHaveClass(pageTabsActiveClass);

			// Testing the previous button in the footer is correct
			prevBtn = screen.getByTestId(testIds.prevBtn);
			expect(prevBtn).toHaveTextContent(expectedCreateModelBtns[0]);

			// Testing the next button in the footer is correct
			nextBtn = screen.getByTestId(testIds.nextBtn);
			expect(nextBtn).toHaveTextContent(expectedPageTabs[1].label);

			// Testing the page heading is correct i.e. X > Model Creation > Create Model
			expect(
				within(screen.getByTestId(testIds.contentHeading)).getByText(
					projects[0].name + " > Model Creation > " + expectedPageTabs[0].label
				)
			).toBeInTheDocument();

			// ACT - 4
			// -> Click next button
			fireEvent.click(nextBtn);

			// ASSERT - 4
			// -> Testing that the page tabs are what they should be
			pageTabLinks.forEach((pageTabLink, index) => {
				const pageTabLabel: string = expectedPageTabs[index].label;
				if (pageTabLabel === "") {
					fail("Empty Label Found in Page Tab.");
				} else {
					expect(pageTabLink).toHaveTextContent(pageTabLabel);
				}
			});

			// Testing the default selected tab in the page tabs
			expect(within(pageTabLinks[1]).getByTestId(testIds.pageTabLinkLabel)).toHaveClass(pageTabsActiveClass);

			// Testing the previous button in the footer is correct
			prevBtn = screen.getByTestId(testIds.prevBtn);
			expect(prevBtn).toHaveTextContent(expectedPageTabs[0].label);

			// Testing the next button in the footer is correct
			nextBtn = screen.getByTestId(testIds.nextBtn);
			expect(nextBtn).toHaveTextContent(expectedCreateModelBtns[1]);

			// Testing the page heading is correct i.e. X > Model Creation > Create Model
			expect(
				within(screen.getByTestId(testIds.contentHeading)).getByText(
					projects[0].name + " > Model Creation > " + expectedPageTabs[1].label
				)
			).toBeInTheDocument();
		}
	);
});
