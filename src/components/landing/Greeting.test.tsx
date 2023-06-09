import {Greeting} from "./Greeting";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {invoke} from "@tauri-apps/api/tauri";
import {when} from "jest-when";

//Mock the backend module
jest.mock("@tauri-apps/api/tauri");

describe('greeting component DOM Tests', function () {

    //mock the invoke method of backend module
    const mockInvoke = invoke as jest.MockedFunction<typeof  invoke>;


    test('should display the default title when no title passed in props', () => {
        render(<Greeting/>);

        expect(screen.getByRole("heading")).toHaveTextContent("Here goes greeting title");
    });

    test('should display the title when title sent', () => {
        const title = "My test Heading";
        render(<Greeting title={title}/>);

        expect(screen.getByRole("heading")).toHaveTextContent(title);
    });

    test('should return the greeting when text entered in text bar', async() => {

        //ARRANGE
        const name = "User1"
        const msg = "Hello, User1! You've been greeted from ChipMonks!"
        const title = "My test Heading";
        when(mockInvoke).calledWith("greet", {name})
            .mockResolvedValue(msg);
        render(<Greeting title={title}/>);

        //ACT
        fireEvent.change(
            await screen.findByRole("textbox"),
            {target: {value: name}}
        );
        fireEvent.click(
            await screen.findByRole("button")
        );
        await screen.findByTitle("greet-msg");


        //ASSERT
        expect(mockInvoke).toBeCalledTimes(1);
        await expect(mockInvoke("greet", {name})).resolves.toEqual(msg);
        expect(screen.getByTitle("greet-msg")).toHaveTextContent(msg);

    })
});