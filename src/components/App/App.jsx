import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Component Imports
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import MenuModal from "../MenuModal/MenuModal";
import Profile from "../Profile/Profile";

// Js Imports
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Utils Imports
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const mobileBreakpoint = 722;

  // UseStates

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Functions

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

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= mobileBreakpoint);
  };

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");

  const onAddItem = (inputValues) => {
    // call the fetch function
    // .then(data)... all the stuff below
    // the ID will be included in the response data
    setClothingItems((clothingItems) => [...clothingItems, inputValues]);
    closeActiveModal();
    // .catch()
  };

  // UseEffects

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    updateIsMobile();

    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            handleMenuClick={handleMenuClick}
            isMobile={isMobile}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  isMobile={isMobile}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          onClose={closeActiveModal}
          card={selectedCard}
        />
        <MenuModal
          handleAddClick={handleAddClick}
          onClose={closeActiveModal}
          isOpen={activeModal === "menu"}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
