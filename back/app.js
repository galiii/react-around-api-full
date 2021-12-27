const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require("cors");
const {login, createUser} = require("./controllers/users");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

// Place this before any routes
const allowedOrigins = [
  "https://around.nomoreparties.co",
  "http://around.nomoreparties.co",
  "http://localhost:3000", // Use the port your frontend is served on
];
app.use(cors({ origin: allowedOrigins }));
app.use(cors());
app.use(helmet());
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "61a765db9054c3c58ddf1d28", //
  };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
