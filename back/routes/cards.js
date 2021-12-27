const cardsRouter = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardsRouter.get("/", getCards); // GET /cards — returns all cards
cardsRouter.post("/", createCard); // POST /cards — creates a new card
cardsRouter.delete("/:cardId", deleteCard); // DELETE /cards/:cardId — deletes a card by _id
cardsRouter.put("/:cardId/likes", likeCard); // PUT /cards/:cardId/likes — like a card
cardsRouter.delete("/:cardId/likes", dislikeCard); // DELETE /cards/:cardId/likes — unlike a card

module.exports = cardsRouter;
