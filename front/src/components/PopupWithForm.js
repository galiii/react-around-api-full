import React from "react";

function PopupWithForm({
  name,
  title,
  formName,
  buttonSubmitTitle,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  //console.log("popup with",{children});

  const popupClassName = `popup popup_type_${name} ${
    isOpen ? "popup_open" : ""
  }`;
  
  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Close"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form name={formName} action="#" className="form" onSubmit={onSubmit}>
          {children}

          <button type="submit" aria-label="Submit" className="form__button">
            {buttonSubmitTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
