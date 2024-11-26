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
    <div className="px-6 lg:p-0">
      <div
        className={`rounded-2xl py-8 px-6 lg:py-14 lg:px-20 grid grid-cols-1 lg:grid-cols-2 ${backGround}`}
      >
        <div className={`${styleCol1}`}>
          <div className="mb-8">{logo}</div>
          <h2 className="mb-8 text-blackSecond text-4xl lg:text-6xl -tracking-[0.04em] lg:leading-[60px] ">
            {title}
          </h2>
          {param}
          <div className="flex justify-center lg:justify-start">
            <ButtonPrimary content={contentBtn} />
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PremiumHomePage;
