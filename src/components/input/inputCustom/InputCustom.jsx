import { Input } from "antd";
import React from "react";

export const InputCustom = ({
  labelContent,
  placeholder,
  handleChange,
  handleBlur,
  name,
  id = "",
  value,
  error,
  touched,
  type = "text",
  className = "",
  readOnly = false,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="font-medium text-sm">
        {labelContent}
      </label>
      <Input
        className={`${className}`}
        value={value}
        name={name}
        id={id}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        readOnly={readOnly}
      />
      {touched && error ? (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      ) : null}
    </div>
  );
};

export const InputPasswordCustom = ({
  labelContent,
  placeholder,
  handleChange,
  handleBlur,
  name,
  id,
  value,
  error,
  touched,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="font-medium text-sm">
        {labelContent}
      </label>
      <Input.Password
        value={value}
        name={name}
        id={id}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {touched && error ? (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      ) : null}
    </div>
  );
};
