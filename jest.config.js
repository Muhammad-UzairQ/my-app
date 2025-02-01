module.exports = {
  // Ensure server.test.js is the first to run
  //   setupFiles: ["<rootDir>/testing/setup.js"],
  setupFilesAfterEnv: ["<rootDir>/testSetup.js"],
  testSequencer: "<rootDir>/testing/sequenceOfTestExecution.js",
  testEnvironment: "node", // Use node environment for backend testing
  verbose: true,
  // Optionally you can also add globalSetup or other configurations
};
