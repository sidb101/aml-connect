import { render, screen } from "@testing-library/react";
import { NavLink, type NavLinkT } from "./NavLink";
import "@testing-library/jest-dom";

const testIds = {
	labelId: "NavLink_label",
};

describe("Appropriate Data based on Component Props", () => {
	const mainProps: NavLinkT = {
		label: "Link1",
	};
	test("Shows the label by default", () => {
		render(<NavLink label={mainProps.label} />);
		expect(screen.getByTestId(testIds.labelId)).toHaveTextContent(mainProps.label);
	});
});

describe("Appropriate classes based on Component Props", () => {
	const enabledClass = "NavLink_link___enabled";
	const selectedClass = "NavLink_link___selected";

	const mainProps: NavLinkT = {
		label: "Link1",
	};

	test("Should Enable and unselected the links when default", () => {
		render(<NavLink label={mainProps.label} />);
		expect(screen.getByTestId(testIds.labelId)).toHaveClass(enabledClass);
		expect(screen.getByTestId(testIds.labelId)).not.toHaveClass(selectedClass);
	});

	test("Should Enable and Selected the links when enabled prop and selected is passed", () => {
		render(<NavLink label={mainProps.label} isEnabled={true} isSelected={true} />);
		expect(screen.getByTestId(testIds.labelId)).toHaveClass(enabledClass);
		expect(screen.getByTestId(testIds.labelId)).toHaveClass(selectedClass);
	});

	test("Should Not Enable the links when enabled prop is not ", () => {
		render(<NavLink label={mainProps.label} isEnabled={false} isSelected={false} />);
		expect(screen.getByTestId(testIds.labelId)).not.toHaveClass(enabledClass);
		expect(screen.getByTestId(testIds.labelId)).not.toHaveClass(selectedClass);
	});
});
