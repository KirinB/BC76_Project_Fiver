import React from "react";
import InputSearch from "../../../components/input/inputSearch/InputSearch";
import CategoryHomePage from "./CategoryHomePage";
import Icons from "../../../components/icon";
import { listCategories } from "../../../common/constant";
const BannerHomePage = () => {
  return (
    <div>
      <div className="bg-banner-homepage h-[500px] w-full bg-no-repeat bg-center bg-cover rounded-2xl relative">
        <div className="flex flex-col justify-center h-full items-center gap-10">
          <h1 className="text-white text-6xl tracking-tight leading-[69px] max-w-[800px] text-center">
            Scale your professional workforce with{" "}
            <span className="font-dancing italic">freelancers</span>
          </h1>
          <InputSearch placeholder={"Search for any service..."} />
        </div>
        <div className="absolute bottom-5 w-full flex justify-center gap-10 opacity-40">
          <span className="text-white text-xs">Trusted by:</span>
          <ul className="flex gap-10">
            <li>
              <Icons.metaLogo />
            </li>
            <li>
              <Icons.googleLogo />
            </li>
            <li>
              <Icons.netflixLogo />
            </li>
            <li>
              <Icons.pgLogo />
            </li>
            <li>
              <Icons.paypalLogo />
            </li>
            <li>
              <Icons.payoneerLogo />
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-9 p-3 space-x-4">
        {listCategories.map((item, index) => {
          return (
            <CategoryHomePage key={index} icon={item.icon} title={item.title} />
          );
        })}
      </div>
    </div>
  );
};

export default BannerHomePage;
