import React from "react";

export const ButtonGhost = ({
  content,
  icon,
  type = "button",
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-2 px-4 hover:text-green-500 inline-flex justify-center items-center gap-2 duration-200 ${className}`}
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

export const ButtonPrimary = ({
  content,
  icon,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-[10px] px-5 border bg-blackSecond text-white font-semibold rounded-lg hover:opacity-80 inline-flex justify-center items-center gap-2 duration-200 ${className}`}
    >
      {icon && <span>{icon}</span>}
      {content}
    </button>
  );
};
export const ButtonGreen = ({
  type = "button",
  onClick,
  content,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} py-4 rounded-md hover:bg-green-800 bg-green-600 duration-200`}
      type={type}
    >
      {content}
    </button>
  );
};
export const ButtonIcon = ({ className = "", type = "button", icon }) => {
  return (
    <button
      type={type}
      className={`w-12 bg-white hover:bg-slate-300 duration-200 rounded-xl ${className}`}
    >
      <img src={icon} alt="" />
    </button>
  );
};
