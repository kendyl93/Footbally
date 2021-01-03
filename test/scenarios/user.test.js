const chai = require("chai");
const chaiHttp = require("chai-http");
const loadDb = require("../fixtures/db.fixtures");
import { getOneByEmail } from "../../src/api/services/user";
const appSetup = require("../setup");
import { signAndGenerateToken } from "../../src/utils";
const { expect } = chai;
chai.use(chaiHttp);

describe("Users", () => {
  let dropDb, users, stopDb, dbUrl, app;
  before(async () => {
    ({ app, dbUrl, stopDb } = await appSetup.init());
    ({
      dropDb,
      entities: { users },
    } = await loadDb(dbUrl));
  });
  after(() => dropDb().then(stopDb));

  it("should fetch all users", async () => {
    const response = await chai
      .request(app)
      .get("/api/user")
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      });

    expect(response).to.have.status(200);
    expect(response.body.users.length).to.eql(2);
    expect(response.body.users).to.eql(users);
  });

  it("should fetch a single user by ID", async () => {
    const response = await chai
      .request(app)
      .get(`/api/user/${users[1]._id}`)
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      });

    expect(response).to.have.status(200);
    expect(response.body.user).to.eql(users[1]);
  });

  it("should return 404 status when user is ot found", async () => {
    const response = await chai
      .request(app)
      .get(`/api/user/123456`)
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      });
    expect(response).to.have.status(404);
  });

  it("should create a new user", async () => {
    const notExist = await getOneByEmail("Johnny@tester.com");

    expect(notExist).to.eql(null);

    const response = await chai
      .request(app)
      .post("/api/user")
      .send({ name: "Johnnytester", email: "Johnny@tester.com" });

    expect(response).to.have.status(200);

    const createdUser = await getOneByEmail("Johnny@tester.com");
    expect(createdUser.name).to.eql("Johnnytester");
    expect(createdUser.email).to.eql("Johnny@tester.com");
  });

  it("should not create a new user if there is no name sent", async () => {
    const response = await chai
      .request(app)
      .post("/api/user")
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      })
      .send({ email: "JohnnyBrother@tester.com" });

    expect(response).to.have.status(400);
  });
});
