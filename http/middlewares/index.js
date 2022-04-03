const auth = require("./auth");

const setupMiddlewares = (app) => {
  app.use(auth);
};

module.exports = {
  setupMiddlewares,
};
