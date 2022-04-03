"use strict";

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { setupRoutes } = require("./routes");
const { setupMiddlewares } = require("./http/middlewares");
const { server } = require("./config");

const app = new Koa();

setupMiddlewares(app);

app.use(bodyParser());
setupRoutes(app);

app.listen(server.PORT);
console.log("Listening on http://localhost:%s/", server.PORT);
