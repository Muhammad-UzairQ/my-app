const app = require("../../app");
const request = require("supertest");

let userToken = "";
let adminToken = "";

describe("Follow API Tests", () => {
  it("should login user successfully with valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "test-user1", password: "password123" });
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
      .send({ username: "test-admin1", password: "password123" });
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
