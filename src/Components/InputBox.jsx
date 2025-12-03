import React from "react";

const InputBox = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="group position-relative mb-3">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`input form-control custom-input ${
          error ? "is-invalid" : ""
        }`}
        autoComplete="off"
      />
      <span className="highlight"></span>
      <span className="bar position-relative d-block"></span>
      <label
        className={`form-label dark-text label ${value ? "floating" : ""}`}
      >
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>

      {error && (
        <div className="invalid-feedback small text-start text-danger mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputBox;
