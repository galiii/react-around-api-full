import React from "react";

function ImagePopup(props) {
  //console.log("image", props);
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_open`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container popup__figure-container">
        <button
          type="button"
          aria-label="Close image"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            alt="default"
            src={props.selectedCard["link"]}
            className="popup__image"
          />
          <figcaption
            className="popup__caption"
            aria-label={props.selectedCard["name"]}
          >
            {props.selectedCard["name"]}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
