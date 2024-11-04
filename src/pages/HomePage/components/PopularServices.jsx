import React from "react";
import CarouselCustom from "../../../components/carousel/CarouselCustom";
import { listPopularServices } from "../../../common/constant";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
const PopularServices = () => {
  return (
    <div>
      <h2 className="mb-9 text-5xl -tracking-[1.44px] text-blackSecond">
        Popular services
      </h2>
      <CarouselCustom responsive={responsive} slidesToSlide={6}>
        {listPopularServices.map((item, index) => {
          return (
            <Link key={index}>
              <div
                style={{ backgroundColor: item.bgColor }}
                className="rounded-2xl min-h-[276px] pt-[25px] p-2 text-white flex flex-col justify-between mx-4 hover:opacity-[.88]"
              >
                <h2 className="text-lg leading-7 px-5 font-semibold">
                  {item.title}
                </h2>
                <div className="">
                  <img
                    className="w-full h-[157px] object-cover rounded-xl"
                    src={item.img}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </CarouselCustom>
    </div>
  );
};

export default PopularServices;
