import { Dropdown, Space } from "antd";
import React, { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
const DropdownCustom = ({
  buttonContent = "dropdown",
  items,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      menu={{ items: [{ label: "The function is not working yet" }] }}
      trigger={["click"]}
      open={isOpen}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`font-semibold capitalize py-2 px-4 hover:bg-gray-100 rounded-md ${className}`}
      >
        {buttonContent}
        <span className="ml-2">
          <DownOutlined
            className={`${
              isOpen ? "rotate-180" : "rotate-0"
            } transition-all duration-300 text-xs text-gray-400`}
          />
        </span>
      </button>
    </Dropdown>
  );
};

export default DropdownCustom;
