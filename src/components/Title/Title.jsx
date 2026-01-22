import "./Title.css";
import { currentDate } from "../Header/Header";

function Title() {
  return (
    <section className="title">
      <h1 className="title__header">{currentDate}, LOCATION</h1>
    </section>
  );
}

export default Title;
