import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  //console.log("currentUser", currentUser);
  //console.log("Cards ", card);
  const { _id } = currentUser;
 // card.owner = "61cc51817878b7c3e3c117a4";
  const isOwn = card.owner === _id;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  console.log(`the isLiked is ${isLiked}`);

  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete_visible" : "card__delete_hidden"
  }`;

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  const handleClick = () => onCardClick(card);
  const handleCardLike = () => onCardLike(card);
  const handleCardDelete = () => onCardDelete(card);

  return (
    <li className="card">
      <img
        src={card["link"]}
        alt={card["name"]}
        className="card__image"
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Delete"
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
      ></button>
      <div className="card__row">
        <h2 className="card__title">{card["name"]}</h2>
        <div className="card__like-container">
          <button
            type="button"
            aria-label="Like"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <span className="card__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
