const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// const { regexURL } = require("../utils/utils");
const UnAuthorizedError = require("../errors/unauthorized-error");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Wrong email format",
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // add the select field
    },
    name: {
      type: String, // the name is a string
      required: true,
      minlength: 2, // the minimum length of the name is 2 characters
      maxlength: 30, // the maximum length is 30 characters
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: "Explorer",
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return validator.isURL(url);
        },
        message: "Sorry. Wrong URL", // when the validator returns false, this message will be displayed
      },
      default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    },
  },
  {
    versionKey: false, // set to false then it wont create in mongodb
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnAuthorizedError("Incorrect email or password 66");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnAuthorizedError("Incorrect email or password 71");
        }
        console.log(user);
        return user; // now user is available
      });
    });
};

// create the model and export it
module.exports = mongoose.model("user", userSchema);
