const Joi = require("joi");

const IssueSchema = {};

IssueSchema.create = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});

module.exports = IssueSchema;
