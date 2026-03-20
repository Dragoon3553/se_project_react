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
import { addItem, getItems, removeItem } from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";

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

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  };

  const handleItemDelete = (itemId) => {
    removeItem(itemId)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // UseEffects

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
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
          handleDeleteClick={handleDeleteClick}
        />
        <MenuModal
          handleAddClick={handleAddClick}
          onClose={closeActiveModal}
          isOpen={activeModal === "menu"}
        />
        <DeleteModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeActiveModal}
          handleItemDelete={handleItemDelete}
          card={selectedCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
