const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app"); // Assuming you export the app instance
const cron = require("node-cron");

let adminToken = "";

jest.mock("node-cron", () => {
  const originalModule = jest.requireActual("node-cron");
  return {
    ...originalModule,
    schedule: jest.fn(),
    getTasks: jest.fn(() => []), // Mocking getTasks to return an empty array
  };
});

beforeAll(async () => {
  await sequelize.authenticate();
  console.log("Connected to the database successfully!");
});

afterAll(async () => {
  await sequelize.close();
  cron.getTasks().forEach((task) => task.stop());
});

describe("Notification API Tests", () => {
  it("should login successfully with valid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "test-admin2",
      password: "password123",
    }); // Replace with real username/password
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
    adminToken = res.body.token;
  });

  it("should get pending notifications", async () => {
    const res = await request(app)
      .get("/notifications")
      .set("Authorization", `Bearer ${adminToken}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.notifications.length).toBe(1);
  });
});
