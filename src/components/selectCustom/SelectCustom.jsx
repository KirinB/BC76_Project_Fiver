import { Select } from "antd";
import React from "react";

const SelectCustom = ({ labelContent, options, mode, handleChange, value }) => {
  return (
    <div className="space-y-1">
      <label className="font-medium text-sm">{labelContent}</label>
      <Select
        value={value}
        onChange={handleChange}
        mode={mode && mode}
        className="w-full"
        options={options}
      />
    </div>
  );
};

export default SelectCustom;
