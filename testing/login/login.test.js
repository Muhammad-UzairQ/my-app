const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app"); // Assuming you export the app instance
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
  await sequelize.authenticate();
  console.log("Connected to the database successfully!");
});

afterAll(async () => {
  await sequelize.close();
  cron.getTasks().forEach((task) => task.stop());
});

describe("Login API Tests", () => {
  it("should login successfully with valid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "test-admin1",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  it("should return 401 for invalid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "wrong", password: "wrong" });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid username or password");
  });

  it("should return 400 Bad Request for missing password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "test-admin1" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Password is required");
  });

  it("should return 400 Bad Request for missing username", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ password: "password123" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Username is required");
  });
  it("should return 404 not found for wrong url", async () => {
    const res = await request(app)
      .post("/auth/logins")
      .send({ username: "test-admin1", password: "password123" });
    expect(res.status).toBe(404);
    expect(JSON.stringify(res.body)).toBe("{}");
  });
});
