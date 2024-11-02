import React from "react";

export const ButtonGhost = ({ content, icon, type = "button" }) => {
  return (
    <button
      type={type}
      className="py-2 px-4 hover:text-green-500 inline-flex justify-center items-center gap-2 duration-200"
    >
      {icon && <span>{icon}</span>}
      {content}
    </button>
  );
};

export const ButtonOutline = ({
  content,
  icon,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 px-4 border border-green-600 text-green-600 rounded-md hover:text-white hover:bg-green-600 inline-flex justify-center items-center gap-2 duration-200 ${className}`}
    >
      {icon && <span>{icon}</span>}
      {content}
    </button>
  );
};
