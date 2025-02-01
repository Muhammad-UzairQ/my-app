const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app"); // Assuming you export the app instance
const cron = require("node-cron");

let userToken = "";
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

describe("Follow API Tests", () => {
  it("should login user successfully with valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "test-user1", password: "password123" }); // Replace with real username/password
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
    userToken = res.body.token;
  });

  it("should send follow request to Admin", async () => {
    const res = await request(app)
      .post(`/follow/1`)
      .set("Authorization", `Bearer ${userToken}`)
      .send();
    expect(res.status).toBe(201);
    expect(res.body.message).toBe(
      "Follow request sent successfully. Await admin approval."
    );
  });

  it("should approve follow request by Admin", async () => {
    const respAdmin = await request(app)
      .post("/auth/login")
      .send({ username: "test-admin1", password: "password123" }); // Replace with real username/password
    expect(respAdmin.status).toBe(200);
    expect(respAdmin.body.message).toBe("Login successful");
    adminToken = respAdmin.body.token;
    const res = await request(app)
      .patch(`/notifications/6/approve`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Notification approved successfully");
  });

  it("should send unfollow request to Admin", async () => {
    const res = await request(app)
      .post(`/unfollow/1`)
      .set("Authorization", `Bearer ${userToken}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Unfollowed successfully");
  });
});
