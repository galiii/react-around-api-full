import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
 
  const currentUser = React.useContext(CurrentUserContext); //Subscription to the context
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  //const [errorMessage, setErrorMessage] = React.useState("");

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent the browser from navigating to the form address

    //Pass the values of the managed components to the external handler
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit Profile"
      formName="profile"
      buttonSubmitTitle="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name-input"
        className="form__input form__input_type_name"
        placeholder="name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""} //It's give me Error on the console of undefined
        onChange={handleChangeName}
      />
      <span id="name-input-error"></span>

      <input
        type="text"
        name="job"
        id="job-input"
        className="form__input form__input_type_job"
        placeholder="job"
        required
        minLength="2"
        maxLength="200"
        value={description || ""} //It's give me Error on the console of undefined
        onChange={handleChangeDescription}
      />
      <span id="job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
