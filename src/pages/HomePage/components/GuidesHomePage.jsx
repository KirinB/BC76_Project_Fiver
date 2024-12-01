import React from "react";
import { Link } from "react-router-dom";
import CarouselCustom from "../../../components/carousel/CarouselCustom";
import { listPopularServices } from "../../../common/constant";
import { ButtonPrimary } from "../../../components/button/ButtonCustom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const dataGuides = [
  {
    image: "/guide_1.jpg",
    title: "Start a side business",
  },
  {
    image: "/guide_2.jpg",
    title: "Ecommerce business Ideas",
  },
  {
    image: "/guide_3.jpg",
    title: "Start an online business and work from home",
  },
  {
    image: "/guide_4.jpg",
    title: "Build a website from scratch",
  },
  {
    image: "/guide_5.jpg",
    title: "Grow your business with AI",
  },
  {
    image: "/guide_6.jpg",
    title: "Create a logo for your business",
  },
];

const GuidesHomePage = () => {
  return (
    <div className="px-6 lg:px-0 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl lg:text-5xl text-blackSecond">
          Guides to help you grow
        </h2>
        <Link className="hidden lg:block hover:underline transition-all duration-200">
          See more
        </Link>
      </div>
      <CarouselCustom responsive={responsive} slidesToSlide={1}>
        {dataGuides.map((item, index) => {
          return (
            <Link key={index} to={"#"} className="group">
              <div className="md:pr-8">
                <div className="group-hover:opacity-80 transition-all duration-200 md:h-[230px] lg:h-[330px] rounded-md mb-6">
                  <img
                    className="w-full h-full rounded-md"
                    src={item.image}
                    alt=""
                  />
                </div>
                <h3 className="text-blackSecond font-bold text-lg">
                  {item.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </CarouselCustom>
      <div className="py-10">
        <div className="px-10 lg:px-0 py-12 bg-[#4D1727] rounded-xl flex flex-col justify-center items-center space-y-10">
          <h2 className="text-4xl lg:text-6xl text-white text-center lg:text-left">
            Freelance services at your{" "}
            <span className="font-domine text-[#ff7640]">fingertips</span>
          </h2>
          <div>
            <ButtonPrimary
              content={"Join Fiverr"}
              className={"border-white bg-white !text-blackSecond"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesHomePage;
