import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Canvas from "../../pages/modelCreationPage/layouts/CreateModel/components/Canvas";
import { mockReactFlow } from "../mockdata/mockReactFlow";
import { nodeOptions } from "../mockdata/allNodesAndEdges";

describe("<Canvas />", () => {
	mockReactFlow();

	test("it should add a new input node to the canvas when dropdown option is clicked", async () => {
		render(<Canvas />);

		// Get the number of input nodes in the canvas
		const startingNumOfInputNodes = screen.getAllByText(nodeOptions[0].label).length - 1;

		// Find the button and click it to show dropdown.
		const addButton = screen.getByText("+");
		fireEvent.click(addButton);

		// Assuming the dropdown is rendered.
		const dropdown = screen.getByRole("listbox");
		const { getByText } = within(dropdown);

		// Click an option in the dropdown.
		fireEvent.click(getByText(nodeOptions[0].menuLabel));

		// Add assertions to ensure that the node has been added.
		const elements = screen.getAllByText(nodeOptions[0].label);
		expect(elements[startingNumOfInputNodes + 1]).toBeInTheDocument();
	});

	test("it should add a new bpf node to the canvas when dropdown option is clicked", async () => {
		render(<Canvas />);

		// Get the number of input nodes in the canvas
		const startingNumOfBandPassNodes = screen.getAllByText(nodeOptions[1].label).length - 1;

		// Find the button and click it to show dropdown.
		const addButton = screen.getByText("+");
		fireEvent.click(addButton);

		// Assuming the dropdown is rendered.
		const dropdown = screen.getByRole("listbox");
		const { getByText } = within(dropdown);

		// Click an option in the dropdown.
		fireEvent.click(getByText(nodeOptions[1].menuLabel));

		// Add assertions to ensure that the node has been added.
		const elements = screen.getAllByText(nodeOptions[1].label);
		expect(elements[startingNumOfBandPassNodes + 1]).toBeInTheDocument();
	});

	test("it should add a new gain node to the canvas when dropdown option is clicked", async () => {
		render(<Canvas />);

		// Get the number of input nodes in the canvas
		const startingNumOfGainNodes = screen.getAllByText(nodeOptions[2].label).length - 1;

		// Find the button and click it to show dropdown.
		const addButton = screen.getByText("+");
		fireEvent.click(addButton);

		// Assuming the dropdown is rendered.
		const dropdown = screen.getByRole("listbox");
		const { getByText } = within(dropdown);

		// Click an option in the dropdown.
		fireEvent.click(getByText(nodeOptions[2].menuLabel));

		// Add assertions to ensure that the node has been added.
		const elements = screen.getAllByText(nodeOptions[2].label);
		expect(elements[startingNumOfGainNodes + 1]).toBeInTheDocument();
	});

	test("it should add a new output node to the canvas when dropdown option is clicked", async () => {
		render(<Canvas />);

		// Get the number of input nodes in the canvas
		const startingNumOfOutputNodes = screen.getAllByText(nodeOptions[3].label).length - 1;

		// Find the button and click it to show dropdown.
		const addButton = screen.getByText("+");
		fireEvent.click(addButton);

		// Assuming the dropdown is rendered.
		const dropdown = screen.getByRole("listbox");
		const { getByText } = within(dropdown);

		// Click an option in the dropdown.
		fireEvent.click(getByText(nodeOptions[3].menuLabel));

		// Add assertions to ensure that the node has been added.
		const elements = screen.getAllByText(nodeOptions[3].label);
		expect(elements[startingNumOfOutputNodes + 1]).toBeInTheDocument();
	});
});
