const app = require("../app");
const request = require("supertest");

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
