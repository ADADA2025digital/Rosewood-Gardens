import React from "react";

const TextBox = ({ label, name, value, onChange, required = false, error }) => {
  return (
    <div className="group position-relative mb-3">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`input custom-input form-control ${
          error ? "is-invalid" : ""
        }`}
        rows="3"
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

export default TextBox;
