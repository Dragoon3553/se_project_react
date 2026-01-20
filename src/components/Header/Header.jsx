import "./Header.css";
import logo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar.png";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="wtwr logo" className="header__logo" />
      <p className="header__date-and-location">{currentDate}, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrance Tegegne</p>
        <img src={avatar} alt="Terrance Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
