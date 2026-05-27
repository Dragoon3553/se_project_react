import { useContext } from "react";
import { NavLink } from "react-router-dom";

// Context Imports
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginContext from "../../contexts/LoginContext";

import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/wtwr_logo.svg";
import { getInitial, generateBackground } from "../../utils/avatar";

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

  const initial = getInitial(currentUser.name);
  const color = generateBackground(currentUser.name);

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
        {isLoggedIn && (
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__profile">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div
                  className="header__avatar"
                  style={{ backgroundColor: color }}
                >
                  {initial}
                </div>
              )}
            </div>
          </NavLink>
        )}
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
