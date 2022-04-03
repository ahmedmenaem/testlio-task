const jwt = require("jsonwebtoken");
const { responses } = require("../api");
const { server } = require("../../config");

module.exports = async (ctx, next) => {
  try {
    const { token } = ctx.headers;
    if (token) {
      const [_, tokenValue] = token.split(" ");
      const decoded = jwt.verify(tokenValue, server.SECRET);
      ctx.state = decoded;
      await next();
    } else {
      return responses.unAuthorized(ctx);
    }
  } catch (error) {
    return responses.unAuthorized(ctx);
  }
};
