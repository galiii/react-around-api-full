const jwt = require("jsonwebtoken");
const UnAuthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthorizedError("Authorization required line 8");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, "not-very-secret-key");
    // console.log("payload",payload);
  } catch (err) {
    throw new UnAuthorizedError("Authorization required line 18");
  }
  req.user = payload._id;
  next();
};
