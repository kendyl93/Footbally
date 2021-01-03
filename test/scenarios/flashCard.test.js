const chai = require("chai");
const chaiHttp = require("chai-http");
const loadDb = require("../fixtures/db.fixtures");
const appSetup = require("../setup");
const { expect } = chai;
chai.use(chaiHttp);
const signAndGenerateToken = require("../../src/utils");

describe("FlashCard", () => {
  let dropDb, flashCards, stopDb, dbUrl, app;
  before(async () => {
    ({ app, dbUrl, stopDb } = await appSetup.init());

    const db = await loadDb(dbUrl);

    dropDb = db.dropDb;
    flashCards = db.entities.flashCards;
  });

  after(async () => await dropDb().then(stopDb));

  it("should fetch all flashCards", async () => {
    const response = await chai
      .request(app)
      .get("/api/flashCard")
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      });
    expect(response).to.have.status(200);
    expect(response.body.flashCards.length).to.eql(2);
    expect(response.body.flashCards).to.eql(flashCards);
  });

  it("should fetch a single flashCard by ID", async () => {
    const response = await chai
      .request(app)
      .get(`/api/flashCard/${flashCards[1]._id}`)
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      });

    expect(response).to.have.status(200);
    expect(response.body.flashCard).to.eql(flashCards[1]);
  });

  it("should return 404 status when flashCard is ot found", async () => {
    const response = await chai
      .request(app)
      .get(`/api/flashCard/123456`)
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      });
    expect(response).to.have.status(404);
  });

  it("should create a new FlashCard", async () => {
    const response = await chai
      .request(app)
      .post("/api/flashCard")
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      })
      .send({ front: "Testing example", back: "Testing example in the back" });

    expect(response).to.have.status(200);
  });

  it("should not create a new FlashCard if there is no back value", async () => {
    const response = await chai
      .request(app)
      .post("/api/flashCard")
      .set({
        Authorization: signAndGenerateToken(
          "test@usersFactory.com",
          "testName"
        ),
      })
      .send({ front: "Testing example" });

    expect(response).to.have.status(400);
  });
});
