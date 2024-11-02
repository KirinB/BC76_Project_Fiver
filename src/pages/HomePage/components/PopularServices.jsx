import React from "react";
import CarouselCustom from "../../../components/carousel/CarouselCustom";
import { listPopularServices } from "../../../common/constant";
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
      <h2 className="mb-9 text-5xl -tracking-[1.44px]">Popular services</h2>
      <CarouselCustom
        responsive={responsive}
        data={listPopularServices}
        slidesToSlide={6}
      />
    </div>
  );
};

export default PopularServices;
