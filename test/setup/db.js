// const { GenericContainer, Wait } = require("testcontainers");
const Fixtures = require("node-mongodb-fixtures");
const fixtures = new Fixtures();
const config = require("../../src/config");

exports.startDb = async () => {
  const port = 27017;
  const user = "testuser";
  const pass = "testpass";

  fixtures.connect(config.DB_URL);

  return {
    stopDb: () => {},
    dbUrl: config.DB_URL,
  };
};
