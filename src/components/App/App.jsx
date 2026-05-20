// React Imports
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import MenuModal from "../MenuModal/MenuModal";
import Profile from "../Profile/Profile";
import DeleteModal from "../DeleteModal/DeleteModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../../../LoginModal/LoginModal";
import RegisterModal from "../../../RegisterModal/RegisterModal";

// Contexts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginContext from "../../contexts/LoginContext";

// Utils
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { apiKey, defaultCoordinates } from "../../utils/constants";
import { getItems, addItem, removeItem } from "../../utils/api";
import * as auth from "../../utils/auth";
import "./App.css";

function App() {
  // Local States
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
  const [currentUser, setCurrentUser] = useState({
    name: "User",
    avatarUrl: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navigate & Location Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch Weather Function
  const fetchWeather = ({ latitude, longitude }) => {
    getWeather({ latitude, longitude }, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((error) => {
        console.error("Weather fetch failed:", error);
        setGeoError("Unable to retrieve weather. Try again.");
      });
  };

  // Mount Effects
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
          fetchWeather(defaultCoordinates);
          setGeoError("Using default location for weather.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      );
    } else {
      fetchWeather(defaultCoordinates);
      setGeoError("Geolocation not supported. Using default location.");
    }

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch((error) => {
        console.error("Failed to fetch clothing items:", error);
      });
  }, []);

  // Resize Effect
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 722);

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // SetActiveModal Handlers
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  };
  const handleAddClick = () => setActiveModal("add-garment");
  const handleMenuClick = () => setActiveModal("menu");
  const handleRegistrationClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

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
      .catch((error) => {
        console.error("Failed to add clothing item:", error);
      });
  };

  // Registration Handler
  const handleRegistration = (inputValues) => {
    const newUserData = {
      name: inputValues.name,
      avatar: inputValues.avatar,
      email: inputValues.email,
      password: inputValues.password,
    };
    auth
      .signup(newUserData)
      .then((res) => {
        // On successful registration
        closeActiveModal();
        setIsLoggedIn(true);
      })
      .catch(console.error);
  };

  // Authorization Handler
  const handleLogin = (inputValues) => {
    const { email, password } = inputValues;
    // If email or password are empty, return without sending a request
    if (!email || !password) {
      return;
    }

    auth
      .signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  // Render Output
  return (
    <LoginContext.Provider value={{ isLoggedIn }}>
      <CurrentUserContext.Provider value={{ currentUser }}>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                handleMenuClick={handleMenuClick}
                handleRegistrationClick={handleRegistrationClick}
                handleLoginClick={handleLoginClick}
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
                    <ProtectedRoute anonymous>
                      <Profile
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        card={selectedCard}
                      />
                    </ProtectedRoute>
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
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
