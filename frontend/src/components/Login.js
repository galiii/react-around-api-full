import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div className="auth">
      <h2 className="auth__title">{"Log in"}</h2>
      <form className="form auth__form" onSubmit={handleSubmit}>
        <input
          className="form__input auth__input"
          name="email"
          value={email || ""}
          type="email"
          onChange={handleEmail}
          placeholder="Email"
          required
        />
        <input
          className="form__input auth__input"
          name="password"
          value={password || ""}
          type="password"
          onChange={handlePassword}
          placeholder="Password"
          required
        />
        <button className="form__button auth__button">{"Log in"}</button>
      </form>

      <div className="auth__text">
        {"Not a member yet? "}
        <Link to="/signup" className="auth__link">
          {"Sign up here!"}
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Login);
