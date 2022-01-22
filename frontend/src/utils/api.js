import { customFetch } from "./utils.js";

class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Loading User Information from the Server
  getUserInfo = (token) => {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Loading Cards from the Server
  getInitialCards = (token) => {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Adding a New Card
  addCard = ({ name, link }, token) => {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    });
  };

  // Deleting a Card
  deleteCard = (cardId, token) => {
    console.log("api", cardId);
    return customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
  };

  // Adding  Likes
  likeCard = (cardId, token) => {
   
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
    });
  };

  // Removing Likes
  dislikeCard = (cardId, token) => {
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
  };

  changeLikeCardStatus = (cardId, isLiked, token) => {
    console.log("API ",cardId, isLiked);
    return customFetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: `${isLiked ? "PUT" : "DELETE"}`,
    });
  };

  // Editing the Profile
  editProfileUserInfo = ({ name, about }, token) => {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    });
  };

  // Updating Profile Picture
  updateUserImage = (avatar, token) => {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify(avatar),
    });
  };
}

const api = new Api({
  //baseUrl: "https://api.gali.students.nomoreparties.sbs",
  baseUrl: "http://localhost:3000",
});

export default api;
