"use strict";
const config = require("../config/sequelize");
const Sequelize = require("sequelize");

module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
    },
  }
);
