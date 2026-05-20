import { useState, useEffect } from "react";
import useFormWithValidation from "../src/hooks/useFormWithValidation";
import ModalWithForm from "../src/components/ModalWithForm/ModalWithForm";

const defaultValues = {
  email: "",
  password: "",
};

const LoginModal = ({ isOpen, onClose, handleLogin }) => {
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
      handleLogin(values);
      setHasSubmitted(false);
    }
  }

  return (
    <ModalWithForm
      title="Log in"
      name="log-in"
      buttonText="Log in"
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
    </ModalWithForm>
  );
};

export default LoginModal;
