import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import MenuModal from "../MenuModal/MenuModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const mobileBreakpoint = 722;

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleMenuClick = () => {
    setActiveModal("menu");
  };

  const toggleMobileMenu = () => {
    setIsMobile(window.innerWidth <= mobileBreakpoint);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    toggleMobileMenu();

    window.addEventListener("resize", toggleMobileMenu);
    return () => window.removeEventListener("resize", toggleMobileMenu);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          handleMenuClick={handleMenuClick}
          toggleMobileMenu={toggleMobileMenu}
          isMobile={isMobile}
          weatherData={weatherData}
        />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imgUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imgUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input id="hot" type="radio" className="modal__radio-input" /> Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" type="radio" className="modal__radio-input" /> Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" type="radio" className="modal__radio-input" /> Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        card={selectedCard}
      />
      <MenuModal
        handleAddClick={handleAddClick}
        onClose={closeActiveModal}
        activeMenu={activeModal}
      />
    </div>
  );
}

export default App;
