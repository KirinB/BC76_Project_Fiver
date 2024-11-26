import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CarouselCustom.scss";

const CarouselCustom = ({ responsive, slidesToSlide, children }) => {
  return (
    <Carousel
      draggable={false}
      responsive={responsive}
      className="carousel"
      slidesToSlide={slidesToSlide}
    >
      {children}
    </Carousel>
  );
};

export default CarouselCustom;
