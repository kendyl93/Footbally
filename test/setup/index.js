const appBootstrap = require("../../src/bootstrap");
const { startDb } = require("./db");

exports.init = async () => {
  const { stopDb, dbUrl } = await startDb();
  const app = await appBootstrap.start({ DB_URL: dbUrl, PORT: 4000 });
  return { app, dbUrl, stopDb };
};
