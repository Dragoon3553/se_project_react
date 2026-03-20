import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, handleDeleteClick }) {
  function handleDelete() {
    if (!card) return;
    handleDeleteClick(card);
  }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_img">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_img"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__img" />
        <div className="modal__footer">
          <div className="modal__title-container">
            <h2 className="modal__caption">{card.name}</h2>
            <button onClick={handleDelete} className="modal__delete-btn">
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
