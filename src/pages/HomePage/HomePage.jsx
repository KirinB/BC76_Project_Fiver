import React from "react";
import BannerHomePage from "./components/BannerHomePage";
import PopularServices from "./components/PopularServices";
import PremiumHomePage from "./components/PremiumHomePage";
import VideoServicesHomePage from "./components/VideoServicesHomePage";
import JoinSectionHomePage from "./components/JoinSectionHomePage";
import Icons from "../../components/icon";
import { dataPremium } from "../../common/constant";
import MadeOnFiverr from "./components/MadeOnFiverr";
import GuidesHomePage from "./components/GuidesHomePage";

const HomePage = () => {
  return (
    <div className="container py-10 space-y-10">
      <BannerHomePage />
      <PopularServices />
      <PremiumHomePage
        logo={<Icons.logoPro />}
        title={
          <>
            The <span className="font-domine text-primary">premium</span>{" "}
            freelance solution for businesses
          </>
        }
        contentBtn={"Try Now"}
        image={"/fiverr-pro.png"}
        param={
          <>
            <div className="grid grid-cols-2 gap-5 mb-10">
              {dataPremium.map((item, index) => {
                return (
                  <div key={index} className="text-blackSecond">
                    <div className="mb-3">
                      <Icons.check />
                    </div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p>{item.param}</p>
                  </div>
                );
              })}
            </div>
          </>
        }
      />
      <VideoServicesHomePage />
      <JoinSectionHomePage />
      <PremiumHomePage
        backGround="bg-[#fff6f2]"
        styleCol1="px-10"
        logo={<Icons.logoMaker />}
        title={
          <>
            Make an incredible logo{" "}
            <span className="font-domine text-[#fc832b]">in seconds</span>
          </>
        }
        param={
          <div className="mb-10 text-xl text-blackSecond">
            Pre-designed by top talent. Just add your touch.
          </div>
        }
        contentBtn={"Try Fiverr Logo Maker"}
        image={"/logo-maker.png"}
      />
      <MadeOnFiverr />
      <GuidesHomePage />
    </div>
  );
};

export default HomePage;
