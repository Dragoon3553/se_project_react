import "./Title.css";
import { currentDate } from "../Header/Header";

function Title({ weatherData }) {
  return (
    <section className="title">
      <h1 className="title__header">
        {currentDate}, {weatherData.city}
      </h1>
    </section>
  );
}

export default Title;
