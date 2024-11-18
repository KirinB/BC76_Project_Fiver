import { Select } from "antd";
import React from "react";

const SelectCustom = ({ labelContent, options, mode, handleChange }) => {
  return (
    <div className="space-y-1">
      <label className="font-medium block">{labelContent}</label>
      <Select
        onChange={handleChange}
        mode={mode && mode}
        className="w-full"
        options={options}
      />
    </div>
  );
};

export default SelectCustom;
