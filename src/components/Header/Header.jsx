import "./Header.css";
import logo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar.png";
import expand from "../../assets/menu_expand.png";

export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddClick, handleMenuClick, isMobile, weatherData }) {
  return (
    <header className="header">
      <img src={logo} alt="wtwr logo" className="header__logo" />
      <div
        className={`header__container ${isMobile ? "header__container_opened" : ""} `}
      >
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrance Tegegne</p>
          <img src={avatar} alt="Terrance Tegegne" className="header__avatar" />
        </div>
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
