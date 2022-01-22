import React from "react";
import failure from "../images/logos/status/error.svg";
import success from "../images/logos/status/ok.svg";

function InfoTooltip({ isOpen, onClose, isSuccessful, message, children }) {
  // console.log("popup with",{children});

  const popupClassName = `popup info-tooltip ${isOpen ? "popup_open" : ""}`;

  const srcStatus = isSuccessful ? success : failure;
  // console.log(srcStatus);
  return (
    <div className={popupClassName}>
      <div className="popup__container info-tooltip__container">
        <button
          type="button"
          aria-label="Close"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          src={srcStatus}
          className="info-tooltip__image"
          alt="Status Failure or Successful"
        />
        <h3 className="popup__title info-tooltip__text">{message}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
