"use strict";

const Router = require("koa-router");
const { issues } = require("../http/controllers");

const router = new Router();

router.post("/issues", issues.create);
router.get("/issues", issues.get);
router.get("/issues/:id", issues.findById);
router.put("/issues/:id", issues.update);

// revisions
router.get(
  "/issues/:id/compare/:revisionIdA/:revisionIdB",
  issues.getRevisions
);

module.exports = router;
