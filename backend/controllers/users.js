const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // importing bcrypt

const User = require("../models/user"); // this file is the user controller
const BadRequestError = require("../errors/bad-request-error"); // 400
const NotFoundError = require("../errors/not-found-error"); // 404
const ConflictError = require("../errors/conflict-error"); // 409

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  console.log("Get User Id", userId);
  console.log("Get User Params", req.params);
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

const getUserById = (req, res, next) => {
  // console.log("userID getUserById",req.user._id);
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("No user found with that id by id");
    })
    .then((userData) => res.status(200).send({ data: userData }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
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
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data passed to the method create User");
      } else if (err.name === "MongoServerError") {
        throw new ConflictError("E11000 An email was specified that already exists on the server.");
      }
      next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log("req in login", req.body);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "not-very-secret-key",
        { expiresIn: "7d" },
      );
      res.send({ token });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  console.log("User id in Update Profile", req.user._id);
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No User found with that id to Update Profile");
    })
    .then((userData) => res.status(200).send({ data: userData }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data passed to the Update Profile");
      }
      next(err);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  console.log("User id in Update Avatar", req.user._id);
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No User found with that id to Update Avatar");
    })
    .then((userData) => res.status(200).send({ data: userData }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data passed to the Update Avatar");
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};