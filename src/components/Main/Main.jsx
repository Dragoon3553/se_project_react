import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Title from "../Title/Title";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { getWeatherType } from "../../utils/weatherApi";
import "./Main.css";

function Main({ clothingItems, isMobile, weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherType = getWeatherType(weatherData.temp.F);

  const filteredItems = clothingItems.filter((item) => {
    return item.weather === weatherType;
  });

  return (
    <main className="main">
      {isMobile && <Title weatherData={weatherData} />}
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))
          ) : (
            <li>No items match the current weather ({weatherType}).</li>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
