import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CarouselCustom.scss";
import { Link } from "react-router-dom";

const CarouselCustom = ({ responsive, data, slidesToSlide }) => {
  return (
    <Carousel
      draggable={false}
      responsive={responsive}
      className="carousel"
      slidesToSlide={slidesToSlide}
    >
      {data.map((item, index) => {
        return (
          <Link>
            <div
              key={index}
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
    </Carousel>
  );
};

export default CarouselCustom;
