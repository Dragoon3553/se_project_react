import "./MenuModal.css";
import avatar from "../../assets/avatar.png";

function MenuModal({ handleAddClick, onClose, activeMenu }) {
  return (
    <div
      className={`modal modal_type_menu ${activeMenu === "menu" ? "modal_opened" : ""}`}
    >
      <div className="modal__content modal__content_type_menu">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_menu"
        ></button>
        <div className="modal__container">
          <p className="modal__username">Terrance Tegegne</p>
          <img src={avatar} alt="Terrance Tegegne" className="modal__avatar" />
        </div>
        <button
          onClick={handleAddClick}
          type="button"
          className="modal__add-clothes-btn"
        >
          + Add Clothes
        </button>
      </div>
    </div>
  );
}

export default MenuModal;
