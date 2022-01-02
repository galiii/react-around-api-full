const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // this file is the user controller
const BadRequestError = require("../errors/bad-request-error"); // 400
const NotFoundError = require("../errors/not-found-error"); // 404

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const userId = req.user;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("No user found with that id by id");
    })
    .then((userData) => res.status(200).send({ data: userData }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("No user found with that id");
    })
    .then((userData) => res.status(200).send({ data: userData }))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid data passed to the Get User");
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log("req in login", req.body);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "not-very-secret-key", {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  console.log("this Req body in createUser line 52", req.body);
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash }))
    .then((userData) => {
      res.status(201).send({
        data: {
          _id: userData._id,
          email: userData.email,
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        },
      });
    })
    .catch((err) => {
      console.log("error",err);
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data passed to the method create User");
      } else {
        next(err);
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const _id = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError("No User found with that id to update profile");
    })
    .then((userData) => res.status(200).send({ data: userData }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data passed to the Update profile");
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const _id = req.user;
  // console.log("the id UPADATE AVATAR", _id);
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError("No User found with that id to update Avatar");
    })
    .then((userData) => {
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data passed to the Update Avatar");
      }
    })
    .catch(next);
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
