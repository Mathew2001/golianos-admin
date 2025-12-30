
import React from "react";

function InputArea({
  label,
  name,
  register,
  errors,
  rules = {},
  type = "text",
  placeholder = "",
}) {
  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={name}
          className="form-label fw-medium"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`form-control${errors?.[name] ? " is-invalid" : ""}`}
        {...register(name, rules)}
      />

      {errors?.[name] && (
        <div className="invalid-feedback d-block">
          {errors[name].message || "This field is required"}
        </div>
      )}
    </div>
  );
}

export default InputArea;

