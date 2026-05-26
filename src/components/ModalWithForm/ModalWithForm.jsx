import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText = "Save",
  isOpen,
  onClose,
  children,
  onSubmit,
  extraButton,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <div className="modal__buttons">
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>
            {extraButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
