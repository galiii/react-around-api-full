const Card = require("../models/card"); // this file is the user controller
const BadRequestError = require("../errors/bad-request-error"); // 400
const NotFoundError = require("../errors/not-found-error"); // 404
const ForbiddenError = require("../errors/forbidden-error"); // 403

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  // console.log("CREATE CARD",req.user._id)
  Card.create({ name, link, owner })
    .then((cardData) => res.status(201).send({ data: cardData }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data passed to the method create Card");
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  // console.log("Card ", cardId);
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError("No card found with that id in Delete card");
    })
    .then((cardData) => {
      if (req.user._id.toString() === cardData.owner.toString()) {
        Card.deleteOne(cardData).then(() => res.status(200).send({ data: cardData }));
      } else {
        // req.user.toString() !== cardData.owner.toString()
        throw new ForbiddenError("This user Isn’t the Owner of this card");
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  // console.log("like 46", cardId);
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No card found with that id LikeCard");
    })
    .then((cardData) => {
      res.status(200).send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid data passed to Like Card");
      }
      next(err);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  // console.log("dislike 71", req.user);
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No card found with that id DisLike");
    })
    .then((cardData) => res.status(200).send({ data: cardData }))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid data passed to DisLike Card");
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};