import React from "react";
import { Link } from "react-router-dom";

function Header({ text, link, ...props }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {(() => {
        if (props.isLoggedIn) {
          return (
            <div className="header__status">
              <div className="header__email">{props.email}</div>
              <Link
                to={link}
                className="header__link header__link-logout"
                onClick={props.onSignOut}
              >
                {text}
              </Link>
            </div>
          );
        } else {
          return (
            <Link to={link} className="header__link">
              {text}
            </Link>
          );
        }
      })()}
    </header>
  );
}

export default Header;
