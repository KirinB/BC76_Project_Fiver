import React from "react";
import { ButtonPrimary } from "../../../components/button/ButtonCustom";

const dataJoinNow = [
  {
    img: "/categories.svg",
    title: "Access a pool of top talent across 700 categories",
  },
  {
    img: "/matching.svg",
    title: "Enjoy a simple, easy-to-use matching experience",
  },
  {
    img: "/quickly.svg",
    title: "Get quality work done quickly and within budget",
  },
  {
    img: "/happy.svg",
    title: "Only pay when you're happy",
  },
];

const JoinSectionHomePage = () => {
  return (
    <div className="px-6 lg:px-0">
      <h2 className="text-4xl lg:text-5xl mb-16 text-blackSecond">
        Make it all happen with freelancers
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 mb-16 space-y-10 lg:space-y-0">
        {dataJoinNow.map((item, index) => {
          return (
            <div className="flex lg:flex-col gap-3" key={index}>
              <img className="w-16" src={item.img} alt="" />
              <p className="max-w-[232px]">{item.title}</p>
            </div>
          );
        })}
      </div>
      <div className="w-full flex lg:justify-center">
        <ButtonPrimary content="Join now" />
      </div>
    </div>
  );
};

export default JoinSectionHomePage;
