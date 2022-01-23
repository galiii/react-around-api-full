const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { celebrate, Joi, errors } = require("celebrate");
require("dotenv").config();

const { login, createUser } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const NotFoundError = require("./errors/not-found-error");

const { PORT = 3000 } = process.env;
console.log(process.env.NODE_ENV); // production
console.log(process.env.JWT_SECRET);
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 100, // you can make a maximum of 100 requests from one IP
});

// applying the rate-limiter
app.use(limiter);

// connect to the MongoDB server
mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json()); // parses data in JSON format only
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors()); // enable requests for all routes

app.use(requestLogger); // enabling the request logger

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      // Requires the string value to be a valid email address.
      email: Joi.string().required().email(),
      // Requires the string value to only contain a-z, A-Z, and 0-9.
      password: Joi.string().required().alphanum(),
    }),
  }),
  createUser,
);

app.use(auth);
app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use("*", (req, res) => {
  throw new NotFoundError("Requested resource not found");
});

app.use(errorLogger); // enabling the error logger
app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  // if an error has no status, give it status 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});