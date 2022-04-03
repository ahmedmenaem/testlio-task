"use strict";

module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "testlio",
  database: process.env.DB_NAME || "trialday",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  dialect: "mysql",
  operatorsAliases: false,
  logging: false,
  pool: {
    max: 10,
    min: 0,
  },
};
