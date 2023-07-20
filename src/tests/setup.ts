import { enableFetchMocks } from "jest-fetch-mock";

//To enable the react-router Request mocking
enableFetchMocks();

//Mock the backend module
jest.mock("@tauri-apps/api/tauri");
