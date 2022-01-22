import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]); //When isOpen reset name and link

  
  const handleAddName = (e) => setName(e.target.value);
  const handleAddLink = (e) => setLink(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent the browser from navigating to the form address

    onAddPlaceSubmit({
      //Pass the values of the managed components to the external handler
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      name="add-card"
      title="New Place"
      formName="new"
      buttonSubmitTitle="Create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="card-title"
        id="card-title-input"
        className="form__input form__input_type_card-title"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        value={name || ""}
        onChange={handleAddName}
      />
      <span id="card-title-input-error"></span>
      <input
        type="url"
        name="card-link"
        id="card-link-input"
        className="form__input form__input_type_card-link"
        placeholder="Image link"
        required
        value={link || ""}
        onChange={handleAddLink}
      />
      <span id="card-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
