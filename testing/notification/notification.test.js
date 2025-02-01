const app = require("../../app");
const request = require("supertest");

let adminToken = "";

describe("Notification API Tests", () => {
  it("should login successfully with valid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "test-admin2",
      password: "password123",
    });
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
