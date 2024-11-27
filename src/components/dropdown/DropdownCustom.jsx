import { Dropdown, Space } from "antd";
import React, { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
const DropdownCustom = ({
  buttonContent = "dropdown",
  items = [{ label: "The function is not working yet" }],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (flag) => {
    setIsOpen(flag);
  };
  return (
    <Dropdown
      menu={{ items: items }}
      trigger={["click"]}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`text-[#62646a] capitalize py-2 px-4 hover:bg-gray-100 rounded-md ${className}`}
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
