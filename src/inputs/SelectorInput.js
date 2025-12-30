import React from "react";

function SelectorInput({
  items = [],
  register,
  name,
  rules = {},
  getValue = (x) => x?.value,
  getLabel = (x) => String(x?.label),
  getKey,
  placeholder = "Select…",
  className = "",
  disabled = false,
  label,
  errors,
}) {
  const keyFn = getKey || getValue;

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

      <select
        id={name}
        disabled={disabled}
        className={`form-select${errors?.[name] ? " is-invalid" : ""} ${className}`}
        {...register(name, rules)}
        defaultValue=""
      >
        <option value="">{placeholder}</option>
        {items.map((item) => {
          const optValue = getValue(item);
          const optLabel = getLabel(item);
          const optKey = keyFn(item);

          return (
            <option key={optKey} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>

      {errors?.[name] && (
        <div className="invalid-feedback d-block">
          {errors[name].message || "This field is required"}
        </div>
      )}
    </div>
  );
}

export default SelectorInput;
