const request = require("supertest");
const server = require("../../app");
const signAndGenerateToken = require("../../utils");
const mongoose = require("mongoose");

describe("Users", () => {
  it("should not allow me to return users if I dont have any authorization token", async () => {
    const res = await request(server).get("/api/users");

    expect(res.statusCode).toEqual(401);
  });

  it("should allow me to return users if I have an authorization token", async () => {
    const res = await request(server)
      .get("/api/users")
      .auth(signAndGenerateToken("p.stanecki93@gmail.com", "Pawel"), {
        type: "bearer",
      });
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  console.log("User Test Ended");
  await mongoose.connection.close();
  server.close();
});
