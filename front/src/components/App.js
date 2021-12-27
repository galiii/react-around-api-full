import React from "react";
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
  // States for auth
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  // Message for error or Successful
  const [message, setMessage] = React.useState("");
  // If the User isLoggedIn true or false
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // Is InfoTooltip is Open popup true or false
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  /* States when you ready Login */
  // Is EditProfilePopup is Open true or false
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  // Is AddPlacePopup is Open true or false
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // Is EditAvatarPopup is Open true or false
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  // Is ImagePopup is Open true or false
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  // Selected card
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState("");
  const history = useHistory();

  /*  Authentication   */

  const tokenCheck = () => {
    // if the user has a token in localStorage,
    // this function will check that the user has a valid token
    const jwt = localStorage.getItem("token");
    console.log("jwt", jwt);
    if (jwt) {
      // we'll verify the token
      auth
        .getContent(jwt)
        .then((res) => {
          console.log("Res", res);
          if (res) {
            // we can get the user data here!
            console.log("emails", res.data.email);
            setUserEmail(res.data.email);
            setIsLoggedIn(true);
            //setIsSuccessful(true);
            history.push("/");
          }
        })
        .catch((err) => {
          if (err === "Error: Bad Request") {
            console.error(
              "400 — Token not provided or provided in the wrong format"
            );
          } else if (err === "Error: Unauthorized") {
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
      //.then(data => console.log(data))
      .then((data) => {
        console.log(data);
        setIsSuccessful(true);
        setMessage(SUCCESS);
        history.push("/signin");
      })
      .catch((err) => {
        if (err === "Error: Bad Request") {
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
          setIsLoggedIn(true);
          console.log("in login", res);
          setIsSuccessful(true);
          setMessage(SUCCESS);
          console.log("login app email", email);
        } else {
          setIsSuccessful(false);
          setMessage(FAILURE);
        }
        console.log("login before token");
        tokenCheck();
      })
      .catch((err, status) => {
        console.log(err);
        if (err === "Error: Bad Request") {
          console.error("400 - one or more of the fields were not provided");
        } else if (err === "Error: Unauthorized") {
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
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserEmail("");
    history.push("/signin");
  };

  React.useEffect(() => {
    tokenCheck();
  }, [history]);

  /* Get User Information && Card List from the api */
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser({ ...userData });
        setCards([...cardData]);
      })
      .catch(console.error);
  }, []);

  /* Click handlers */
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  /* Handle popup current card click */
  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
    setIsImagePopupOpen(true);
  };

  /* Like && DisLike Card handler */
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); //Check one more time if this card was already liked
    api //Send a request to the API and getting the updated card data
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  };

  /* Delete Card handler */
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(
          (state) => state.filter((c) => c._id !== card._id) //Create array of cards that aren't delete
        );
      })
      .catch(console.error);
  };

  /* Edit profile User handler */
  const handleUpdateUser = (user) => {
    api
      .editProfileUserInfo(user)
      .then((res) => {
        setCurrentUser({
          ...res,
        });
        setIsEditProfilePopupOpen(false);
      })
      .catch(console.error);
  };

  /* Update profile image */
  const handleUpdateAvatar = (link) => {
    api
      .updateUserImage(link)
      .then((res) => {
        setCurrentUser({
          ...res,
        });
        setIsEditAvatarPopupOpen(false);
      })
      .catch(console.error);
  };

  /* Add new Card handler */
  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((res) => {
        //likes [] , _id, name, link, owner
        console.log("add res", res);
        setCards([res, ...cards]);
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

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <div className="page__container">
      {/* embedding data from the currentUser using the  context provider  */}
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
            {
              //if the user isLoggedIn send him to the Main page
              //else send him to the login/signin page
              isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />
            }
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
