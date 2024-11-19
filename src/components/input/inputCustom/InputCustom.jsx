import { Input } from "antd";
import React from "react";

const InputCustom = ({
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
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="font-medium">
        {labelContent}
      </label>
      <Input
        className={`${className} py-2`}
        value={value}
        name={name}
        id={id}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
      />
      {touched && error ? <p className="text-red-500 mt-1">{error}</p> : null}
    </div>
  );
};

export default InputCustom;
