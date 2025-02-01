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
  // Ensure the database connection is established before running tests
  await sequelize.authenticate();
  console.log("Connected to the database successfully!");
});

afterAll(async () => {
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
