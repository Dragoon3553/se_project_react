// React Imports
import { useEffect, useRef, useState } from "react";
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
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// Contexts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginContext from "../../contexts/LoginContext";

// Utils
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { apiKey, defaultCoordinates } from "../../utils/constants";
import {
  getItems,
  addItem,
  removeItem,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { getToken, setToken, removeToken } from "../../utils/token";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    avatar: "",
  });

  // Navigate & Location Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const hasMounted = useRef(false);

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
    const token = getToken();

    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setCurrentUser({
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
          });
          setIsLoggedIn(true);
          setIsLoading(false);
          const lastRoute = localStorage.getItem("lastRoute");
          navigate(lastRoute);
        })
        .catch(console.error);
    }

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

  // Route Path Save Effect
  useEffect(() => {
    // Saves current path to localStorage only if component has mounted, preventing overwrite on initial load
    if (hasMounted.current) {
      localStorage.setItem("lastRoute", location?.pathname);
    } else {
      hasMounted.current = true;
    }
  }, [location.pathname]);

  // SetActiveModal Handlers
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  };
  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch(console.error)
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch(console.error);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleMenuClick = () => setActiveModal("menu");
  const handleRegistrationClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const closeActiveModal = () => setActiveModal("");

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

  // Registration Handler
  const handleRegistration = (inputValues) => {
    const newUserData = {
      name: inputValues.name,
      avatar: inputValues.avatar ? inputValues.avatar : undefined,
      email: inputValues.email,
      password: inputValues.password,
    };
    auth
      .signup(newUserData)
      .then((res) => {
        // On successful registration
        closeActiveModal();
        setCurrentUser({ _id: res._id, name: res.name, avatar: res.avatar });
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(console.error);
  };

  // Authorization / Login Handler
  const handleLogin = (inputValues) => {
    const { email, password } = inputValues;
    // If email or password are empty, return without sending a request
    if (!email || !password) {
      return;
    }

    auth
      .signin({ email, password })
      .then((res) => {
        if (!res.token) {
          return Promise.reject(new Error("No token returned"));
        }

        setToken(res.token);
        return auth.checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser({ _id: user._id, name: user.name, avatar: user.avatar });
        setIsLoggedIn(true);
        setIsLoading(false);
        closeActiveModal();
      })
      .catch((err) => {
        setErrorMessage("Incorrect password");
        console.error(err);
      });
  };

  // Logout Handler
  const handleLogout = () => {
    removeToken();
    navigate("/");
    setCurrentUser({ _id: "", name: "", avatar: "" });
    setIsLoggedIn(false);
    setIsLoading(true);
    closeActiveModal();
  };

  // Add Item Handler
  const onAddItem = (inputValues) => {
    const token = getToken();
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
      owner: inputValues.owner,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add clothing item:", error);
      });
  };

  // Edit Profile Handler
  const onEditProfile = (inputValues) => {
    const token = getToken();
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const updatedProfileData = {
      name: inputValues.name,
      avatar: inputValues.avatar ? inputValues.avatar : undefined,
    };

    editProfile(updatedProfileData, token)
      .then((data) => {
        setCurrentUser({ _id: data._id, name: data.name, avatar: data.avatar });
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to edit profile:", error);
      });
  };

  // Delete Item Handler
  const handleItemDelete = (itemId) => {
    const token = getToken();
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    removeItem(itemId, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Render Output
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
                    <ProtectedRoute anonymous>
                      <Main
                        clothingItems={clothingItems}
                        isMobile={isMobile}
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoading={isLoading}>
                      <Profile
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        handleEditProfileClick={handleEditProfileClick}
                        handleLogout={handleLogout}
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
              handleRegistrationClick={handleRegistrationClick}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              errorMessage={errorMessage}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              handleLoginClick={handleLoginClick}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onEditProfile={onEditProfile}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
