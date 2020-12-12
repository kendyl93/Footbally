const Fixtures = require("node-mongodb-fixtures");
const path = require("path");
module.exports = async (dbUrl) => {
  const fixtures = new Fixtures({ dir: path.resolve(__dirname, "./entities") });
  await fixtures.connect(dbUrl).then(() => fixtures.load());
  const articles = await Promise.resolve(
    fixtures._db.collection("flashCards")
  ).then((collection) => {
    return collection.find().toArray();
  });
  const cleanup = () => fixtures.unload().then(() => fixtures.disconnect());
  return { deleteArticles: cleanup, entities: articles };
};
