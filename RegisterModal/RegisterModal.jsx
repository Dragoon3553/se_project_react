import { useState, useEffect } from "react";
import useFormWithValidation from "../src/hooks/useFormWithValidation";
import ModalWithForm from "../src/components/ModalWithForm/ModalWithForm";

const defaultValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

const RegisterModal = ({ isOpen, onClose, handleRegistration }) => {
  const { values, handleChange, errors, resetForm, validateAll } =
    useFormWithValidation(defaultValues);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setHasSubmitted(false);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setHasSubmitted(true);
    const isFormValid = validateAll();
    if (isFormValid) {
      handleRegistration(values);
      setHasSubmitted(false);
    }
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="sign-up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className={`modal__input ${hasSubmitted && errors.email ? "modal__input_invalid" : ""}`}
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {hasSubmitted && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className={`modal__input ${hasSubmitted && errors.password ? "modal__input_invalid" : ""}`}
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {hasSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className={`modal__input ${hasSubmitted && errors.name ? "modal__input_invalid" : ""}`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {hasSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          name="avatar"
          className={`modal__input ${hasSubmitted && errors.avatar ? "modal__input_invalid" : ""}`}
          id="avatar"
          placeholder="Avatar URL"
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

export default RegisterModal;
