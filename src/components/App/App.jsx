import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// 1) components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import MenuModal from "../MenuModal/MenuModal";
import Profile from "../Profile/Profile";
import DeleteModal from "../DeleteModal/DeleteModal";

// 2) context
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// 3) API / utils
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { apiKey } from "../../utils/constants";
import { getItems, addItem, removeItem } from "../../utils/api";
import "./App.css";

function App() {
  // 4) local state
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
  const [geoError, setGeoError] = useState("");

  // 5) utility functions
  const fetchWeather = ({ latitude, longitude }) => {
    getWeather({ latitude, longitude }, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((error) => {
        console.error("Weather fetch failed:", error);
        setGeoError("Unable to retrieve weather. Try again.");
      });
  };

  // 6) mount effects
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation failed:", error);
          setGeoError(
            "Location access denied. Please allow location to get weather.",
          );
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      );
    } else {
      setGeoError("Geolocation not supported by your browser.");
    }

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch((error) => {
        console.error("Failed to fetch clothing items:", error);
      });
  }, []);

  // 7) resize effect
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 722);

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // 8) event handlers
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");
  const handleMenuClick = () => setActiveModal("menu");

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

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

  // 9) render output
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
            geoError={geoError} // optional display
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
