const Fixtures = require("node-mongodb-fixtures");
const path = require("path");
module.exports = async (dbUrl) => {
  const fixtures = new Fixtures({
    dir: path.resolve(__dirname, "./entities"),
    mute: true,
  });

  await fixtures.connect(dbUrl).then(() => fixtures.load());

  const flashCards = await Promise.resolve(
    fixtures._db.collection("flashCard")
  ).then((collection) => {
    return collection.find().toArray();
  });

  const users = await Promise.resolve(fixtures._db.collection("user")).then(
    (collection) => {
      return collection.find().toArray();
    }
  );

  return {
    dropDb: () => fixtures.unload().then(() => fixtures.disconnect()),
    entities: { flashCards, users },
  };
};
