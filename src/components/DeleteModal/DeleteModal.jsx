import "./DeleteModal.css";

function DeleteModal({ isOpen, onClose, handleItemDelete, card }) {
  function handleDelete() {
    if (!card) return;
    handleItemDelete(card._id);
    onClose();
  }
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_delete"
        ></button>
        <p className="modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <button onClick={handleDelete} className="modal__delete-btn">
          Yes, delete item
        </button>
        <button onClick={onClose} className="modal__cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
