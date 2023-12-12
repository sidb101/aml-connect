/* eslint-disable @typescript-eslint/naming-convention */
import { describe } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, screen, within } from "@testing-library/react";
import { when } from "jest-when";
import { getExactText, renderWithProviders, testIds } from "../test-utils";
import { routes as appRoutes } from "../../App";
import { BASE_ROUTE } from "../../routes";
import { getOpenProjectNavLinks } from "../../components/sideBar/navRegion/appNavLinks";
import { linkSelectedClass } from "../../components/sideBar/navRegion/navLink/NavLink";
import { mockReactFlow } from "../mockdata/mockReactFlow";
import remoteClient from "../../service/RemoteService/client/TauriApiClient";
import type { ShallowProjectDetails } from "../../redux/slices/ProjectSlice";
import { mockProjects } from "../mockdata/allProjectsMock";
import remoteService from "../../service/RemoteService/RemoteService";

jest.mock("../../service/RemoteService/client/TauriApiClient");
jest.mock("../../service/RemoteService/RemoteService");

beforeEach(() => {
	mockReactFlow();
});

/**
 * Performing test on basic Navigation Functionality
 */
describe("Testing the Sidebar of the App", () => {
	//define the routing for given test suite
	const routes = appRoutes;

	const contentHeadings = [
		"Overview",
		"Data Hub > Data Setup",
		"Model Creation > Create Model",
		"Results > Results Analysis",
		"Send to Hardware",
	];

	test(
		"that 1) sidebar shows all the projects in the app, when app starts. " +
			"2) when visited on any one project, it changes the nav-links accordingly. " +
			"3) When visited on those links, appropriate Headings are loaded",
		async () => {
			//ARRANGE
			//should start with empty store
			const storeState = {};

			//mock the response from backend
			const projects: ShallowProjectDetails[] = mockProjects;
			when(remoteService.getAllProjects).mockResolvedValue(projects);
			when(remoteService.getAllElements).mockResolvedValue({});

			//set the values of mocked functions
			when(remoteClient.getInputFiles)
				.expectCalledWith({
					dataset_type: "Training",
					proj_slug: projects[0].slug,
				})
				.mockResolvedValue({
					files: [],
				});

			//Need to start from the base route
			const routeToRender = [BASE_ROUTE];

			//ACT - 1
			renderWithProviders(routes, {
				preloadedState: storeState,
				initialEntries: routeToRender,
			});

			//ASSERT - 1
			//the sidebar should have all the projects shown.
			const sideBarLinks = await screen.findAllByTestId(testIds.projectLinks);
			sideBarLinks.forEach((sideBarLink, index) => {
				expect(sideBarLink).toHaveTextContent(getExactText(projects[index].name));
			});

			//ACT - 2
			//click on the first project
			fireEvent.click(sideBarLinks[0]);

			//ASSERT - 2
			//Valid Sidebar heading Heading
			const sideHeading = await screen.findByTestId(testIds.navHeading);
			expect(sideHeading).toHaveTextContent(projects[0].name);

			//Valid Links Labels
			const expectedNavLinks = getOpenProjectNavLinks(projects[0].slug);
			let navLinks = await screen.findAllByTestId(testIds.navLinks);
			navLinks.forEach((navLink, index) => {
				const navLinkLabel: string = expectedNavLinks[index].label || "";
				if (navLinkLabel) {
					expect(navLink).toHaveTextContent(navLinkLabel);
				} else {
					fail("Empty Label Found in NavLink.");
				}
			});

			//Valid Default Link
			expect(within(navLinks[0]).getByTestId(testIds.navLinkLabels)).toHaveClass(linkSelectedClass);
			expect(
				within(screen.getByTestId(testIds.contentHeading)).getByText(
					projects[0].name + " > " + contentHeadings[0]
				)
			).toBeInTheDocument();

			//ACT, ASSERT - 3
			//click on various navigation links, every component should be loaded accordingly with proper heading
			for (let i = 0; i < navLinks.length; i++) {
				fireEvent.click(navLinks[i]);

				//eslint-disable-next-line no-await-in-loop
				const contentHeading = await screen.findByTestId(testIds.contentHeading);
				expect(contentHeading).toHaveTextContent(projects[0].name + " > " + contentHeadings[i]);

				//valid nav link is selected
				//eslint-disable-next-line no-await-in-loop
				navLinks = await screen.findAllByTestId(testIds.navLinks);
				expect(within(navLinks[i]).getByTestId(testIds.navLinkLabels)).toHaveClass(linkSelectedClass);
			}
		}
	);
});

describe("Testing Invalid Route", () => {
	//define the routing for given test suite
	const routes = appRoutes;

	test("that it shows valid error page when invalid route is loaded", async () => {
		//ARRANGE
		//Need to start from the invalid route
		const routeToRender = ["invalid-route"];

		//ACT
		renderWithProviders(routes, {
			initialEntries: routeToRender,
		});

		//ASSERT
		const errorPage = await screen.findByTestId(testIds.errorPage);
		expect(within(errorPage).getByRole("heading")).toHaveTextContent(getExactText("Oops!"));
		expect(errorPage).toHaveTextContent("Sorry, an unexpected error has occurred.");
	});
});
