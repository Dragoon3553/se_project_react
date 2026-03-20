import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  name: "",
  imageUrl: "",
  weather: "",
};

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const { values, handleChange, resetForm } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);

    resetForm();
  }

  return (
    <ModalWithForm
      title="New Garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imgUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imgUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            id="hot"
            type="radio"
            checked={values.weather === "hot"}
            name="weather"
            value="hot"
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            id="warm"
            type="radio"
            checked={values.weather === "warm"}
            name="weather"
            value="warm"
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            id="cold"
            type="radio"
            checked={values.weather === "cold"}
            name="weather"
            value="cold"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
