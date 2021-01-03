import bootstrap from "./bootstrap";
import config from "./config";

(async () => {
  const app = await bootstrap.start(config);
  app.listen(config.PORT, function () {
    console.log(`App listening on port ${config.PORT}!`);
  });
})();
