const Card = require("../models/card"); // this file is the user controller
const BadRequestError = require("../errors/bad-request-error"); // 400
const NotFoundError = require("../errors/not-found-error"); // 404
const ForbiddenError = require("../errors/forbidden-error");

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
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
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError("No card found with that id");
    })
    .then((cardData) => {
      console.log("the card before delete", cardData);
      if (req.user.toString() === cardData.owner.toString()) {
        Card.deleteOne(cardData).then((card) => res.status(200).send({ data: card }));
      } else if (req.user.toString() !== cardData.owner.toString()) {
        throw new ForbiddenError("This user Isn’t the Owner of this card");
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  // console.log("like 67", req.user);
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user } },
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
      } else {
        next(err);
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user } }, { new: true })
    .orFail(() => {
      throw new NotFoundError("No card found with that id DisLike");
    })
    .then((cardData) => res.status(200).send({ data: cardData }))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid data passed to DISLike Card");
      } else { // getting stack on postman if you dont do this
        next(err);
      }
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
