import { describe } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, getByLabelText, getByText, screen, waitFor, within } from "@testing-library/react";
import { when } from "jest-when";
import { invoke } from "@tauri-apps/api/tauri";
import { getExactText, renderWithProviders, testIds } from "../test-utils";
import { routes as appRoutes } from "../../App";
import { BASE_ROUTE } from "../../routes";
import { mockProjects } from "../mockdata/allProjects";
import type { ListProjectsResponse } from "../../service/RemoteService/client/bindings/ListProjectsResponse";

afterEach(() => {
	jest.clearAllMocks();
});

describe("Testing the CRUD operations for projects", () => {
	//mock the invoke method of backend module
	const mockInvoke = invoke as jest.MockedFunction<typeof invoke>;

	//mock the response from backend
	const mockResponse: ListProjectsResponse = {
		projects: mockProjects,
	};
	when(mockInvoke).mockResolvedValue(mockResponse);

	const dummyProjectName = "Test Project";
	const dummyProjectDescription = "Test Description";

	//define the routing for given test suite
	const routes = appRoutes;

	test(
		"Test the CRUD operations relating to projects. " +
			"1) Test the 'R' (Read) operation. " +
			"2) Test the 'C' (Create) operation. " +
			"3) Test the 'R' (Read) operation. " +
			"4) Test the 'U' (Update) operation. " +
			"5) Test the 'R' (Read) operation. " +
			"6) Test the 'D' (Delete) operation. " +
			"7) Test the 'R' (Read) operation. ",
		async () => {
			//ARRANGE
			//should start with empty store
			const storeState = {};

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
				expect(sideBarLink).toHaveTextContent(getExactText(mockProjects[index].name));
			});

			//the landing page should have all the projects shown.
			const projectDisplayCards = await screen.findAllByTestId(testIds.displayCardLinks);
			projectDisplayCards.forEach((projectDisplayCard, index) => {
				expect(projectDisplayCard).toHaveTextContent(getExactText(mockProjects[index].name));
			});

			//ACT - 2
			fireEvent.click(screen.getByText("Create New Project"));

			//ASSERT - 2
			const createFromScratchBtn = screen.getByText("Create from scratch");
			expect(createFromScratchBtn).toBeInTheDocument();

			//ACT - 3
			fireEvent.click(createFromScratchBtn);

			//ASSERT - 3
			const sideBarLink = screen.getByTestId(testIds.navHeading);
			expect(sideBarLink).toHaveTextContent("New Project");
			expect(
				within(screen.getByTestId(testIds.contentHeading)).getByText("New Project > Create New Project")
			).toBeInTheDocument();

			const projectNameInput = screen.getByTestId(testIds.projectNameInput);
			expect(projectNameInput).toBeInTheDocument();
			const projectDescriptionInput = screen.getByTestId(testIds.projectDescriptionInput);
			expect(projectDescriptionInput).toBeInTheDocument();

			//ACT - 4
			fireEvent.change(projectNameInput, { target: { value: dummyProjectName } });
			fireEvent.change(projectDescriptionInput, {
				target: { value: dummyProjectDescription },
			});

			//fireEvent.click(screen.getByTestId(testIds.projectFormSubmitBtn));

			//ASSERT - 4
			// Check the last sidebar link has the new project name
			//const sideBarLinksAfterNewProject = await screen.findAllByTestId(testIds.projectLinks);
		}
	);
});
