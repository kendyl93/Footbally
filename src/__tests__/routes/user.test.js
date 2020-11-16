const request = require("supertest");
const server = require("../../app");
const signAndGenerateToken = require("../../utils");
const mongoose = require("mongoose");

describe("User", () => {
  it("should not allow me to return users if I dont have any authorization token", async () => {
    const res = await request(server).get("/api/user/5fb2b97115922147483ef8d3");

    expect(res.statusCode).toEqual(401);
  });

  it("should allow me to return users if I have an authorization token", async () => {
    const res = await request(server)
      .get("/api/user/5fb2b97115922147483ef8d3")
      .set(
        "authorization",
        `${signAndGenerateToken("p.stanecki93@gmail.com", "Pawel")}`
      );
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  console.log("User Test Ended");
  await mongoose.connection.close();
  server.close();
});
