import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(""); //Assigning the object returned by a hook to a variable

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]); //When isOpen reset name and avatar (i did want to prevent this but i not sure how to reset)

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent the browser from navigating to the form address

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <div>
      <PopupWithForm
        name="update-image-profile"
        title="Change profile picture"
        formName="profile-img"
        buttonSubmitTitle="Save"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          type="url"
          name="avatar"
          id="avatar-input"
          className="form__input form__input_type_avatar"
          placeholder="avatar"
          required
          ref={avatarRef}
        />
        <span id="avatar-input-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default EditAvatarPopup;
