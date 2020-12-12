const chai = require("chai");
const chaiHttp = require("chai-http");
const createArticles = require("../fixtures/flashCards.fixtures");
const appSetup = require("../setup");
const { expect } = chai;
chai.use(chaiHttp);

describe("FlashCards", () => {
  let deleteFlashCards, flashCards, stopDb, dbUrl, app;
  before(async () => {
    ({ app, dbUrl, stopDb } = await appSetup.init());
    ({ deleteFlashCards, entities: flashCards } = await createArticles(dbUrl));
  });
  after(() => deleteFlashCards().then(stopDb));
  describe("GET /", () => {
    it("should fetch all flashCards", async () => {
      const response = await chai.request(app).get("/api/flashCard");
      expect(response).to.have.status(200);
      expect(response.body.flashCards.length).to.eql(2);
      expect(response.body.flashCards).to.eql(flashCards);
    });

    it("should fetch a single flashCard by ID", async () => {
      const response = await chai
        .request(app)
        .get(`/api/flashCard/${flashCards[1]._id}`);

      expect(response).to.have.status(200);
      expect(response.body.flashCard).to.eql(flashCards[1]);
    });

    it("should return 404 status when flashCard is ot found", async () => {
      const response = await chai.request(app).get(`/api/flashCard/123456`);
      expect(response).to.have.status(404);
    });
  });
});
