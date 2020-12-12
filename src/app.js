const bootstrap = require("./bootstrap");
const config = require("./config");

(async () => {
  const app = await bootstrap.start(config);
  app.listen(config.PORT, function () {
    console.log(`App listening on port ${config.PORT}!`);
  });
})();
