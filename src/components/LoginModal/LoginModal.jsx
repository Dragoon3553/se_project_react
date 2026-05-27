import { useState, useEffect } from "react";

import useFormWithValidation from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const defaultValues = {
  email: "",
  password: "",
};

const LoginModal = ({
  isOpen,
  handleRegistrationClick,
  onClose,
  handleLogin,
  errorMessage,
}) => {
  const { values, handleChange, errors, resetForm, validateAll } =
    useFormWithValidation(defaultValues);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleRegisterClick = () => {
    onClose();
    handleRegistrationClick();
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setHasSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setHasSubmitted(true);

    const isFormValid = validateAll();
    if (isFormValid) {
      handleLogin(values);
      setHasSubmitted(false);
    }
  };

  // Extra Button Variable
  const registerButton = (
    <button
      onClick={handleRegisterClick}
      type="button"
      className="modal__register-btn"
    >
      or Register
    </button>
  );

  return (
    <ModalWithForm
      title="Log in"
      name="log-in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      extraButton={registerButton}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className={`modal__input ${hasSubmitted && errors.email ? "modal__input_invalid" : ""}`}
          id="login-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {hasSubmitted && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>
      <label
        htmlFor="password"
        className={`modal__label ${errorMessage ? "modal__label_incorrect" : ""}`}
      >
        {errorMessage ? errorMessage : "Password"}
        <input
          type="password"
          name="password"
          className={`modal__input ${hasSubmitted && errors.password ? "modal__input_invalid" : errorMessage ? "modal__input_incorrect" : ""}`}
          id="login-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {hasSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
