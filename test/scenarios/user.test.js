const chai = require("chai");
const chaiHttp = require("chai-http");
const loadDb = require("../fixtures/db.fixtures");
const appSetup = require("../setup");
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
    const response = await chai.request(app).get("/api/user");

    expect(response).to.have.status(200);
    expect(response.body.users.length).to.eql(2);
    expect(response.body.users).to.eql(users);
  });

  it("should fetch a single user by ID", async () => {
    const response = await chai.request(app).get(`/api/user/${users[1]._id}`);

    expect(response).to.have.status(200);
    expect(response.body.user).to.eql(users[1]);
  });

  it("should return 404 status when user is ot found", async () => {
    const response = await chai.request(app).get(`/api/user/123456`);
    expect(response).to.have.status(404);
  });
});
