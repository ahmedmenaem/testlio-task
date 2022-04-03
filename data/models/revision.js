"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../../utils/connection");
const Issue = require("./issue");

const Revision = sequelize.define(
  "revision",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    change_key: Sequelize.STRING,
    old_value: Sequelize.STRING,
    new_value: Sequelize.STRING,
    created_by: {
      type: Sequelize.STRING,
      defaultValue: "unknown",
    },
    issue_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at",
    tableName: "revisions",
  }
);

Revision.belongsTo(Issue, {
  foreignKey: "issue_id",
  onDelete: "CASCADE",
  as: "issue",
  targetKey: "id",
});

Issue.hasMany(Revision, {
  as: "revisions",
  foreignKey: "issue_id",
  sourceKey: "id",
});

module.exports = Revision;
