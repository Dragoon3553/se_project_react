import "./ToggleSwitch.css";

function Switch() {
  return (
    <label className="toggle-switch">
      <input type="checkbox" className="toggle-switch__checkbox" />
      <span className="toggle-switch__slider"></span>
      <span className="toggle-switch__text toggle-switch__text_F">F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
    // <div className="switch">
    //   <input
    //     // checked={isFarenheit}
    //     // onChange={handleToggle}
    //     id="Farenheit"
    //     type="checkbox"
    //     className="switch__checkbox"
    //   />
    //   <label htmlFor="Farenheit" className="switch__label">
    //     <span className="switch__button" />
    //   </label>
    // </div>
  );
}

export default Switch;
