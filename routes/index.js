const issuesRoutes = require("./issues");

const setupRoutes = (app) => {
  app.use(issuesRoutes.routes());
};

module.exports = {
  setupRoutes,
};
