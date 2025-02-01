// custom-sequencer.js
const JestTestSequencer = require("@jest/test-sequencer").default;

class CustomTestSequencer extends JestTestSequencer {
  sort(tests) {
    // Specify the order in which the tests should run
    const order = [
      "server.test.js", // Run server tests first
      "login.test.js", // Then login tests
      "video.test.js", // Then video tests
      "follow.test.js", // Then follow tests
      "notification.test.js", // Then notification tests
    ];

    const orderedTests = [];
    order.forEach((fileName) => {
      const test = tests.find((test) => test.path.includes(fileName));
      if (test) {
        orderedTests.push(test);
      }
    });

    // Return the tests in the specified order
    return orderedTests;
  }
}

module.exports = CustomTestSequencer;
