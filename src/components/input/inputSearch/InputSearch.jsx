import React from "react";
import "./InputSearch.scss";
import { Input } from "antd";

const InputSearch = ({
  placeholder,
  value,
  handleChange,
  handleClick,
  className,

  onSearch = () => {},
}) => {
  return (
    <Input.Search
      onClick={handleClick}
      onChange={handleChange}
      className={`input_search ${className}`}
      onSearch={onSearch}
      placeholder={placeholder}
    />
  );
};

export default InputSearch;
