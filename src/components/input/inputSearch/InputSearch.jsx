import React from "react";
import "./InputSearch.scss";
import { Input } from "antd";

const InputSearch = ({ placeholder }) => {
  return <Input.Search className="input_search" placeholder={placeholder} />;
};

export default InputSearch;
