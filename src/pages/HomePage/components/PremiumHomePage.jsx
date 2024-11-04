import React from "react";
import Icons from "../../../components/icon";
import { dataPremium } from "../../../common/constant";
import { ButtonPrimary } from "../../../components/button/ButtonCustom";

const PremiumHomePage = ({
  backGround = "bg-second",
  styleCol1 = "",
  logo,
  title,
  param,
  contentBtn,
  image,
}) => {
  return (
    <div className={`rounded-2xl py-14 px-20 grid grid-cols-2 ${backGround}`}>
      <div className={`${styleCol1}`}>
        <div className="mb-8">{logo}</div>
        <h2 className="mb-8 text-blackSecond text-6xl -tracking-[0.04em] leading-[60px] ">
          {title}
        </h2>
        {param}
        <ButtonPrimary content={contentBtn} />
      </div>
      <div className="flex justify-center items-center">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default PremiumHomePage;
