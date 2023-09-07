/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "<rootDir>/src/coverage",
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/tests",
    "src/clients"
  ],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/mockdata/fileMock.ts"
  },

  setupFilesAfterEnv: ["./src/tests/setup.ts"]
};
