import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img src={sunny} alt="sun" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
