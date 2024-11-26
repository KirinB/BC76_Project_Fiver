import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Icons from "../../components/Icons";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

const ItemSearchJob = ({
  idProduct,
  imgBg,
  imgAuthor,
  author,
  title,
  star,
  rate,
  price,
}) => {
  return (
    <Link
      to={`/product?id=${idProduct}`}
      className="group flex flex-col space-y-2"
    >
      <div className="relative">
        <img className="rounded-lg shadow-md w-full" src={imgBg} alt="" />
        <Tooltip title="Save to list">
          <div className="absolute pointer-events-auto cursor-pointer top-4 right-4 bg-white p-2 rounded-full">
            <IoMdHeartEmpty className="text-blackSecond" size={20} />
          </div>
        </Tooltip>
      </div>
      <div className="flex space-x-2">
        <img className="rounded-full h-6 w-6" src={imgAuthor} alt="" />
        <span className="capitalize font-semibold">{author}</span>
      </div>
      <p className="group-hover:underline">{title}</p>
      <p className="flex space-x-1 items-baseline">
        <Icons.star />
        <strong>{star}</strong>
        <span className="text-[#74767e]">({rate})</span>
      </p>
      <p className="font-semibold">Form US${price}</p>
    </Link>
  );
};

export default ItemSearchJob;
