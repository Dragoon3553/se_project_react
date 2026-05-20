import { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar.png";

// Context Imports
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginContext from "../../contexts/LoginContext";

export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({
  handleAddClick,
  handleMenuClick,
  handleRegistrationClick,
  handleLoginClick,
  isMobile,
  weatherData,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(LoginContext);

  const getInitial = (name) => {
    return `${name.split(" ")[0][0]}`;
  };
  const generateBackground = (name) => {
    let hash = 0;
    let i;

    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);

      let color = "#";

      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      return color;
    }
  };

  let initial = getInitial(currentUser.name);
  let color = generateBackground(currentUser.name);
  const customStyle = {
    display: "flex",
    height: "50px",
    width: "50px",
    borderRadius: "100px",
    color: "white",
    background: color,
    margin: "auto",
  };

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </NavLink>
      <div
        className={`header__container ${isMobile ? "header__container_opened" : ""} `}
      >
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />
        {!isLoggedIn && (
          <div className="header__main_container">
            <button
              onClick={handleRegistrationClick}
              type="button"
              className="header__sign-up-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </div>
        )}
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        )}
        <NavLink className="header__nav-link" to="/profile">
          {isLoggedIn && (
            <div className="header__profile">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar" style={customStyle}>
                  <span style={{ margin: "auto" }}> {initial} </span>
                </div>
              )}
            </div>
          )}
        </NavLink>
      </div>
      {isMobile && (
        <button
          onClick={handleMenuClick}
          type="button"
          className="header__hamburger"
        ></button>
      )}
    </header>
  );
}

export default Header;
