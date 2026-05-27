import { useContext } from "react";

// Context Imports
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginContext from "../../contexts/LoginContext";

import "./MenuModal.css";
import { generateBackground, getInitial } from "../../utils/avatar";

function MenuModal({ handleAddClick, onClose, isOpen }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(LoginContext);

  const initial = getInitial(currentUser.name);
  const color = generateBackground(currentUser.name);

  return (
    <div className={`modal modal_type_menu ${isOpen ? "modal_opened" : ""}`}>
      {isLoggedIn && (
        <div className="modal__content modal__content_type_menu">
          <button
            onClick={onClose}
            type="button"
            className="modal__close modal__close_type_menu"
          ></button>
          <div className="modal__container">
            <p className="modal__username">{currentUser.name}</p>
            <div className="modal__avatar" style={{ backgroundColor: color }}>
              {initial}
            </div>
          </div>
          <button
            onClick={handleAddClick}
            type="button"
            className="modal__add-clothes-btn"
          >
            + Add Clothes
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuModal;
