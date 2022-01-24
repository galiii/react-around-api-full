import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from "./Header";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../utils/api.js";
import * as auth from "../utils/auth";
import { SUCCESS, FAILURE } from "../utils/constants.js";
import "../index.css";

function App() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const history = useHistory();

  const tokenCheck = () => {
    console.log("jwt", token);
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          //console.log("Res", res);
          if (res) {
            setUserEmail(res.data.email);
            setIsLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log("line 59 App",err);
          if (err === "Bad Request") {
            console.error("400 — Token not provided or provided in the wrong format");
          } else if (err === "Unauthorized") {
            console.error("401 — The provided token is invalid ");
          } else {
            console.error(err);
          }
        });
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleSignUp = ({ email, password }) => {
    auth
      .register({ email, password })
      .then((data) => {
        console.log("in sigup",data);
        setIsSuccessful(true);
        setMessage(SUCCESS);
        history.push("/signin");
      })
      .catch((err) => {
        console.log("line 83 App",err);
        if (err === "Bad Request") {
          console.error("400 - one of the fields was filled in incorrectly");
        } else {
          console.error("err", err);
        }

        setIsSuccessful(false);
        setMessage(FAILURE);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  };

  const handleLogin = ({ email, password }) => {
    
    auth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          setIsLoggedIn(true);
          setIsSuccessful(true);
          history.push("/");
          console.log("login app email", email);
        } else {
          setIsSuccessful(false);
          setMessage(FAILURE);
        }
      })
      .catch((err, status) => {
        console.log(err);
        if (err === "Bad Request") {
          console.error("400 - one or more of the fields were not provided");
        } else if (err === "Unauthorized") {
          console.error("401 - the user with the specified email not found ");
        } else {
          console.error("err", err);
        }
        setIsSuccessful(false);
        setMessage(FAILURE);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
    history.push("/signin");
  };

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
    setIsImagePopupOpen(true);
  };

  const handleCardLike = (card) => {
    //console.log("card",card);
    const isLiked = card.likes.some((i) => i === currentUser._id);
    //console.log("Array Cards", card.likes);
    console.log("isLiked in APP", isLiked);
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        console.log("In App Card Like:: ", newCard.data);
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id, token)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  };

  const handleUpdateUser = (user) => {
    console.log("user", user);
    api
      .editProfileUserInfo(user, token)
      .then((res) => {
        setCurrentUser({
          ...res.data,
        });
        setIsEditProfilePopupOpen(false);
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = (link) => {
    console.log("link", link);
    api
      .updateUserImage(link, token)
      .then((res) => {
        setCurrentUser({
          ...res.data,
        });
        setIsEditAvatarPopupOpen(false);
      })
      .catch(console.error);
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data, token)
      .then((res) => {
        console.log("add res", res.data);
        setCards([res.data, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(console.error);
  };

  const closeAllPopups = () => {
    setIsInfoTooltipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  useEffect(() => {
    console.log("token in 215",token);
    tokenCheck();
    console.log("token in 217",token);
  }, [token, history]);

  useEffect(() => {
    console.log(`line 223 ${token}`);
    Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
      .then(([userData, cardsData]) => {
        console.log("Users app",userData);
        setCurrentUser({ ...userData.data });
        console.log("Cards app",cardsData);
        setCards([...cardsData.data]);
      })
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [closeAllPopups]);

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/signup">
            <Header text={"Login"} link={"/sigin"} />
            <Register onSignUp={handleSignUp} />
          </Route>
          <Route path="/signin">
            <Header text={"Sign Up"} link={"/signup"} />
            <Login onLogin={handleLogin} />
          </Route>

          <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/">
            <Header
              text={"Log out"}
              link={"/"}
              email={userEmail}
              isLoggedIn={isLoggedIn}
              onSignOut={handleSignOut}
            />
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        {isLoggedIn ? <Footer /> : ""}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
          message={message}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-card"
          title="Are you sure ?"
          formName="delete"
          buttonSubmitTitle="Yes"
          //isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          //onSubmit={handleDeleteCard}
        />

        {/** Image Popup*/}
        <ImagePopup
          isOpen={isImagePopupOpen}
          name="image"
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
