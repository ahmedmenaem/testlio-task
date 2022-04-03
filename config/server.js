module.exports = {
  PORT: process.env.SERVER_PORT || 8080,
  HOST: process.env.SERVER_HOST || "0.0.0.0",
  SECRET: process.env.SERVER_SECRET || "secretkey",
};
