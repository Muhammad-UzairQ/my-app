const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app"); // Assuming you export the app instance
const cron = require("node-cron");

let adminToken = "";
let userToken = "";

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

describe("Video API Tests", () => {
  it("should Admin login successfully with valid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "test-admin1",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
    adminToken = res.body.token;
  });

  it("should get all his videos", async () => {
    const res = await request(app)
      .get("/video/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.videos.length).toBe(2);
    expect(res.body.videos[0].isPublic).toBe(true);
    expect(res.body.videos[1].isPublic).toBe(false);
  });

  it("should User login successfully with valid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "test-user1",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
    userToken = res.body.token;
  });

  it("should user get public videos of admin", async () => {
    const res = await request(app)
      .get("/video/1")
      .set("Authorization", `Bearer ${userToken}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.videos.length).toBe(1);
    expect(res.body.videos[0].isPublic).toBe(true);
  });
});
