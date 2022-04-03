"use strict";

const { responses } = require("../api");
const Issue = require("../../data/models/issue");
const Revision = require("../../data/models/revision");
const { IssueSchema } = require("../validations");
const connection = require("../../utils/connection");
const { Op } = require("sequelize");

const Issues = {};

Issues.get = async (ctx) => {
  try {
    const issues = await Issue.findAll({
      include: {
        association: "revisions",
      },
    });
    responses.success(ctx, { issues });
  } catch (error) {
    console.log(error);
  }
};

Issues.findById = async (ctx) => {
  const issue = await Issue.findByPk(ctx.params.id, {
    include: {
      association: "revisions",
    },
  });
  responses.success(ctx, { issue });
};

Issues.create = async (ctx) => {
  const { error, value } = IssueSchema.create.validate(ctx.request.body);

  if (!error) {
    const issue = await Issue.create({
      ...value,
      created_by: ctx.state.email,
      updated_by: ctx.state.email,
    });
    responses.success(ctx, { issue });
  } else {
    responses.badRequest(ctx, error);
  }
};

Issues.update = async (ctx) => {
  const t = await connection.transaction();
  try {
    const { error, value } = IssueSchema.create.validate(ctx.request.body);

    if (!error) {
      const issue = await Issue.findByPk(ctx.params.id);
      // add new revision to keep history record
      const key = Object.keys(value)[0];
      const revision = await Revision.create(
        {
          change_key: key,
          new_value: value[key],
          old_value: issue[key],
          issue_id: issue.id,
          created_by: ctx.state.email,
        },
        { transaction: t }
      );
      // update issue
      await issue.update(
        { ...value, updated_by: ctx.state.email },
        { transaction: t }
      );
      // commit change
      await t.commit();
      responses.success(ctx, { issue });
    } else {
      responses.badRequest(ctx, error);
    }
  } catch (error) {
    console.error(error);
    await t.rollback();
    responses.serverError(ctx);
  }
};

Issues.getRevisions = async (ctx) => {
  const { id, revisionIdA, revisionIdB } = ctx.params;
  const issue = await Issue.findByPk(parseInt(id));
  const revisions = await Revision.findAll({
    where: {
      id: {
        [Op.between]: [revisionIdA, revisionIdB],
      },
    },
    issue_id: id,
  });

  const before = { ...issue.dataValues };
  revisions.forEach((revision) => {
    if (revision.id == revisionIdA) {
      before[revision.change_key] = revision["new_value"];
    } else {
      before[revision.change_key] = revision["old_value"];
    }
  });

  const after = { ...issue.dataValues };
  revisions.forEach((revision) => {
    after[revision.change_key] = revision["new_value"];
  });

  const changes = {};
  revisions.forEach(
    (revision) => (changes[revision.change_key] = revision.new_value)
  );

  responses.success(ctx, {
    revisions,
    before,
    after,
    changes,
  });
};

module.exports = Issues;
