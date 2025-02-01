const util = require("util");
const exec = util.promisify(require("child_process").exec);
const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models"); // Import Sequelize instance
const cron = require("node-cron");

jest.mock("node-cron", () => {
  const originalModule = jest.requireActual("node-cron");
  return {
    ...originalModule,
    schedule: jest.fn(),
    getTasks: jest.fn(() => []), // Mocking getTasks to return an empty array
  };
});

beforeAll(async () => {
  try {
    // Run the seeders with stdio inherited to manage process handles
    await exec(
      "npx sequelize-cli db:seed:all --env test --seeders-path seeders/test",
      { stdio: "inherit" }
    );

    // Ensure the database connection is established before running tests
    await sequelize.authenticate();
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.error(`Seeder Error: ${err.message}`);
    throw err;
  }
});

afterAll(async () => {
  try {
    // Undo all test seeders
    await exec(
      "npx sequelize-cli db:seed:undo:all --env test --seeders-path seeders/test"
    );
  } catch (err) {
    console.error(`Undo Seeder Error: ${err.message}`);
  }
  // Close the database connection after tests to prevent Jest from hanging
  await sequelize.close();
  cron.getTasks().forEach((task) => task.stop());
});

describe("API Tests", () => {
  it("should return Welcome message from /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Welcome to the Node.js Boilerplate"); // Based on app.js response
  });

  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.status).toBe(404);
  });
});
