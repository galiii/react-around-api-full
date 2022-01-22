const mongoose = require("mongoose");
const { regexURL } = require("../utils/utils");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return regexURL.test(v);
        },
        message: "Sorry. Wrong URL",
      },
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // set to false then it wont create in mongodb
  },
);

module.exports = mongoose.model("card", cardSchema);