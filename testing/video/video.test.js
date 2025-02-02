const app = require("../../app");
const request = require("supertest");

let adminToken = "";
let userToken = "";

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
      username: "test-user2",
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
