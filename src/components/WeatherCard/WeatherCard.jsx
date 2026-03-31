import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const condition = (weatherData.condition || "").toLowerCase().trim();
  const isDay = !!weatherData.isDay;

  const filteredOptions = weatherOptions.filter(
    (option) => option.day === isDay && option.condition === condition,
  );

  const weatherOption =
    filteredOptions[0] || defaultWeatherOptions[isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img
        key={weatherOption.url}
        src={weatherOption.url}
        alt={`${isDay ? "day" : "night"} ${condition || "default"}`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
