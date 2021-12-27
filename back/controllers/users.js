const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user"); // this file is the user controller
const {
  ERROR_CODE, //400;
  DEFAULT_ERROR, //500;
  NOT_FOUND, //404
  OK, //200
} = require("../utils/utils");


const NotFoundError = require("../errors/not-found-error.js");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      res.status(400).send({ message: err.message || "An error has occurred" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((userData) => res.status(200).send({ data: userData }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        res
          .status(400)
          .send({ message: "Invalid data passed to the Get User" });
      } else {
        res
          .status(500)
          .send({ message: err.message || "An error has occurred" });
      }
    });
};

const getUserById = (req, res, next) => {
  console.log("req", req);
  User.findById(req.user._id)
  .orFail(() => {
    throw new  NotFoundError("DocumentNotFoundError  No user found with that id")
  })
  .then((userData) => res.status(200).send({ data: userData }))
  .catch(next);
}

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(`here the email ${email}`);
  // search database for user with the given email
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // create a token
      const token = jwt.sign({ _id: user._id }, "not-so-secret-string", {
        expiresIn: "7d",
      });
      console.log("this token", token);
      res.send({ token });
    })
    .catch((err) => {
      console.log(`here errorrr ${err.message}`);
      res.status(401).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        name,
        about,
        avatar,
        // adding the hash to the database as password field
        password: hash,
      })
    )
    .then((userData) =>
      res.status(201).send({
        data: {
          _id: userData._id,
          email: userData.email,
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        },
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message:
            "Invalid data passed to the method create User" || err.message,
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: err.message || "An error has occurred" });
      }
    });
};

/*
Options:
new: bool - true to return the modified document rather than the original. defaults to false
runValidators: if true, runs update validators on this command. Update validators validate
the update operation against the model's schema.
*/

const updateProfile = (req, res) => {
  const { _id, name, about } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("No User found with that id to update profile");
      error.statusCode = NOT_FOUND;
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((userData) => {
      res.status(OK).send({ data: userData });
    })
    .catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message: "Invalid data passed to the Update profile" || err.message,
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: err.message || "An error has occurred" });
      }
    });
};

const updateAvatar = (req, res) => {
  const { _id, avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error("No User found with that id to update Avatar");
      error.statusCode = NOT_FOUND;
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      console.log("update Avatar", err.name);
      if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message: "Invalid data passed to the Update Avatar" || err.message,
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: err.message || "An error has occurred" });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  login,
  createUser,
  updateProfile,
  updateAvatar,
};
