import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      {/* Profile */}
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser["avatar"]}
            alt={currentUser["name"]}
            className="profile__image"
          />

          <button
            className="profile__update-image"
            onClick={onEditAvatarClick}
          ></button>
        </div>

        <div className="profile__section-information">
          <div className="profile__row-information">
            <h1 className="profile__name">{currentUser["name"]}</h1>
            <button
              type="button"
              aria-label="Edit"
              className="profile__edit-button"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job"> {currentUser["about"]}</p>
        </div>
        <button
          type="button"
          aria-label="Add"
          className="profile__add-button"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      {/* Cards__list  */}
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card["_id"]}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
