const chai = require("chai");
const chaiHttp = require("chai-http");
const createArticles = require("../fixtures/flashCards.fixtures");
const appSetup = require("../setup");
const { expect } = chai;
chai.use(chaiHttp);
const stringifyProps = (object) => JSON.parse(JSON.stringify(object));

describe("Articles", () => {
  let deleteArticles, articles, stopDb, dbUrl, app;
  before(async () => {
    ({ app, dbUrl, stopDb } = await appSetup.init());
    ({ deleteArticles, entities: articles } = await createArticles(dbUrl));

    console.log({ articles });
  });
  after(() => deleteArticles().then(stopDb));
  describe("GET /", () => {
    it("must fetch all articles", async () => {
      const response = await chai.request(app).get("/api/flashCard");
      expect(response).to.have.status(200);
      expect(response.body.flashCards.length).to.eql(2);

      console.log({ reaa: response.body.flashCards });

      // expect(response.body).to.be.a("object").with.property("flashCards");
      // const expectedArticles = articles.map(stringifyProps);
      // const actualArticles = response.body.articles.map(stringifyProps);
      // expect(actualArticles).to.eql(expectedArticles);
    });

    it("must fetch a single article by ID", async () => {
      const [, secondArticle] = articles;
      const response = await chai
        .request(app)
        .get(`/api/flashCard/${secondArticle._id}`);
      expect(response).to.have.status(200);
      expect(response.body).to.be.an("object").with.property("flashCard");
      const expectedArticle = stringifyProps(secondArticle);
      const actualActicle = stringifyProps(response.body.article);
      expect(actualActicle).to.eql(expectedArticle);
    });

    it("must fetch respond with not found", async () => {
      const response = await chai
        .request(app)
        .get(`/api/flashCard/${articles[1].authorId}`);
      expect(response).to.have.status(404);
    });
  });
});
