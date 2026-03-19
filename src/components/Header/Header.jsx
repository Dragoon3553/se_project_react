import { NavLink } from "react-router-dom";

import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar.png";

export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddClick, handleMenuClick, isMobile, weatherData }) {
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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__profile">
            <p className="header__username">Terrance Tegegne</p>
            <img
              src={avatar}
              alt="Terrance Tegegne"
              className="header__avatar"
            />
          </div>
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
