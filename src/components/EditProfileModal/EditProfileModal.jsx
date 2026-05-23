import { useContext, useEffect, useState } from "react";

// Context Imports
import CurrentUserContext from "../../contexts/CurrentUserContext";

import useFormWithValidation from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

const defaultValues = {
  name: "",
  avatar: "",
};

const EditProfileModal = ({ isOpen, onClose, onEditProfile }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const { values, handleChange, errors, resetForm, validateAll } =
    useFormWithValidation(defaultValues);
  const [hasSubmitted, setHasSubmited] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setHasSubmited(false);
    }
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setHasSubmited(true);

    const isFormValid = validateAll();
    if (isFormValid) {
      onEditProfile(values);
      setHasSubmited(false);
    }
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="change-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          name="name"
          className={`modal__input ${hasSubmitted && errors.name ? "modal__input_invalid" : ""}`}
          id="name"
          placeholder={currentUser.name}
          value={values.name}
          onChange={handleChange}
        />
        {hasSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          name="avatar"
          className={`modal__input ${hasSubmitted && errors.avatar ? "modal__input_invalid" : ""}`}
          id="avatar"
          placeholder={currentUser.avatar ? currentUser.avatar : "Avatar Url"}
          value={values.avatar}
          onChange={handleChange}
        />
        {hasSubmitted && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
