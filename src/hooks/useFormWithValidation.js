import { useState } from "react";

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const useFormWithValidation = (defaultValues) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validateAll = () => {
    const newErrors = {};
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!values.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!isValidUrl(values.imageUrl)) {
      newErrors.imageUrl = "Invalid URL";
    }
    if (!values.weather) {
      newErrors.weather = "Weather type is required";
    }
    setErrors(newErrors);
    const valid = Object.keys(newErrors).length === 0;
    setIsValid(valid);
    return valid;
  };

  const resetForm = () => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  };

  return { values, handleChange, errors, isValid, resetForm, validateAll };
};

export default useFormWithValidation;
