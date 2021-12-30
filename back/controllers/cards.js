const Card = require("../models/card"); // this file is the user controller
const {
  ERROR_CODE,
  DEFAULT_ERROR,
  NOT_FOUND,
  OK,
} = require("../utils/utils");

const getCards = (req, res) => {
  //console.log("Gets cards", req);
  Card.find({})
    //.populate("owner")
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      res
        .status(DEFAULT_ERROR)
        .send({ message: err.message || "An error has occurred" });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
console.log("line 22 cards",req.user );
  Card.create({ name, link, owner: req.user })
    .then((cardData) => res.status(OK).send({ data: cardData }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message:
            "Invalid data passed to the method create Card" || err.message,
        });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: err.message || "An error has occurred" });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error("No card found with that id");
      error.statusCode = NOT_FOUND;
      error.name = "DocumentNotFoundError";
      throw error; //
    })
    .then((cardData) => res.status(OK).send({ data: cardData }))
    .catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res
          .status(ERROR_CODE)
          .send({ message: "Invalid data passed to the Delete Card" });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: err.message || "An error has occurred" });
      }
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
console.log("like 67",req.user);
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user } }, { new: true })
    .orFail(() => {
      const error = new Error("No card found with that id LikeCard");
      error.statusCode = NOT_FOUND;
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((cardData) => {res.status(200).send({ data: cardData })})
    .catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res
          .status(ERROR_CODE)
          .send({ message: "Invalid data passed to Like Card" });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: err.message || "An error has occurred" });
      }
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user } }, { new: true })
    .orFail(() => {
      const error = new Error("No card found with that id DisLike");
      error.statusCode = NOT_FOUND;
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((cardData) => res.status(OK).send({ data: cardData }))
    .catch((err) => {
      if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res
          .status(ERROR_CODE)
          .send({ message: "Invalid data passed to DISLike Card" });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: err.message || "An error has occurred" });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
