const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

console.log("in auth .env");
console.log(NODE_ENV); // production
console.log(JWT_SECRET);
const UnAuthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // check that the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthorizedError("Authorization required");
  }

  const token = authorization.replace("Bearer ", "");

  let payload; // if token is verified, save the payload
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "not-very-secret-key",
    );
  } catch (err) {
    throw new UnAuthorizedError("Authorization required");
  }

  /* Save payload to request. This makes the payload available
   to the latter parts of the route. See the `Accessing user
   data with req.user` example for details. */
  req.user = payload;

  next(); // sending the request to the next middleware
};