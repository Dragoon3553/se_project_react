import { handleServerResponse } from "./api";

const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then(handleServerResponse);
};

const filterWeatherData = (data) => ({
  type: data.weather[0].main,
  temp: {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  },
  city: data.name,
  condition: String(data.weather[0].main || "")
    .toLowerCase()
    .trim(),
  isDay: data.dt > data.sys.sunrise && data.dt < data.sys.sunset,
});

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) return "hot";
  else if (temperature >= 66) return "warm";
  else return "cold";
};

export { getWeather, filterWeatherData, getWeatherType };
