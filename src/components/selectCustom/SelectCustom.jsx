import { Select } from "antd";
import React from "react";

const SelectCustom = ({
  labelContent,
  options,
  mode,
  handleChange,
  value,
  error,
  touched,
}) => {
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
      {error && touched && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectCustom;
