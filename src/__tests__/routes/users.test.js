const Helper = require("../helper");
const helper = new Helper();
const server = require("../../app");
const users = require("../../routes/staticUsers");
const URL_PREFIX = "/api";

/*
      declare the token variable in a scope accessible
      by the entire test suite
    */
let token;

beforeAll((done) => {
  helper.apiServer
    .post("/api")
    .send({
      user: {
        name: "user",
        email: "pw",
      },
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

describe("Users", () => {
  it("Get all users", async () => {
    const { body } = await helper.apiServer
      .get(URL_PREFIX)
      .set("Authorization", `Bearer ${token}`);

    expect(body).toEqual(users);
  });

  it("Get first user", async () => {
    const firstUserId = "d5958b21-beae-4b08-84b8-bc71fdd500e5";
    const firstUserEndpoint = `${URL_PREFIX}/${firstUserId}`;
    const { body } = await helper.apiServer
      .get(firstUserEndpoint)
      .set("Authorization", `Bearer ${token}`);

    expect(body).toEqual(users[0]);
  });
});
