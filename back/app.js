const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const { celebrate, Joi, errors } = require("celebrate");
const { login, createUser } = require("./controllers/users");
const router = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const NotFoundError = require("./errors/not-found-error");
//require("dotenv").config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  /*useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,*/
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger); // enabling the request logger
//app.use(cors({ origin: allowedOrigins }));
app.use(cors());
app.options("*", cors()); //enable requests for all routes

app.post("/signin", login);
app.post("/signup", createUser);

//app.use(auth);
//app.use("/users",router);
app.use('/users', auth, router);
//app.post("/users", auth);

app.use("/cards",auth, cardsRouter);

app.get("*", (req, res) => {
  throw new NotFoundError("Requested resource not found");
});

app.use(errorLogger); // enabling the error logger
//app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err; // if an error has no status, display 500
  console.log(message);
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
