import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { Tooltip } from "antd";
import Masonry from "masonry-layout";
import { useEffect, useRef } from "react";
import imagesLoaded from "imagesloaded";

const dataProducts = [
  {
    image: "/product_1.png",
    featured: "Illustration",
    author: "tonymldl",
  },
  {
    image: "/product_2.png",
    featured: "Architecture & Interior Design",
    author: "greenpalette",
  },
  {
    image: "/product_3.png",
    featured: "Architecture & Interior Design",
    author: "lehuy_design",
  },
  {
    image: "/product_4.png",
    featured: "Architecture & Interior Design",
    author: "tantung2869",
  },
  {
    image: "/product_5.png",
    featured: "Architecture & Interior Design",
    author: "kirinb",
  },
  {
    image: "/product_6.png",
    featured: "Illustration",
    author: "kirinb",
  },
  {
    image: "/product_7.png",
    featured: "Architecture & Interior Design",
    author: "kirinb",
  },
  {
    image: "/product_8.png",
    featured: "Architecture & Interior Design",
    author: "kirinb",
  },
  {
    image: "/product_9.png",
    featured: "Architecture & Interior Design",
    author: "kirinb",
  },
  {
    image: "/product_10.png",
    featured: "Architecture & Interior Design",
    author: "kirinb",
  },
];

const MadeOnFiverr = () => {
  const gridRef = useRef();

  useEffect(() => {
    imagesLoaded(gridRef.current, () => {
      new Masonry(gridRef.current, {
        itemSelector: ".masonry-item",
        columnWidth: ".masonry-item",
        percentPosition: true,
      });
    });
  }, []);
  return (
    <div className="space-y-10">
      <h2 className="text-blackSecond text-5xl">Made on Fiverr</h2>
      <div ref={gridRef} className="grid">
        {dataProducts.map((item, index) => {
          return (
            <div className="masonry-item w-1/4 p-2" key={index}>
              <div className="rounded-lg shadow-lg relative overflow-hidden group">
                <Link to={"#"}>
                  <img className="rounded-lg w-full" src={item.image} alt="" />
                </Link>
                <div className="absolute rounded-lg flex flex-col-reverse bg-gradient-to-t from-blackSecond/65 to-transparent inset-0 pointer-events-none opacity-0 transition-all duration-200 group-hover:opacity-100">
                  <div className="flex justify-between items-center p-4 w-full text-white">
                    <div className="text-sm">
                      <p>
                        Featured in: <strong>{item.featured}</strong>
                      </p>
                      <p>
                        by: <strong>{item.author}</strong>
                      </p>
                    </div>
                    <div className="hover:bg-white p-2 rounded-full hover:text-blackSecond pointer-events-auto cursor-pointer transition-all duration-200">
                      <BsThreeDots size={23} />
                    </div>
                  </div>
                  <Tooltip title="Save to list">
                    <div className="absolute pointer-events-auto cursor-pointer top-4 right-4 bg-white p-2 rounded-full">
                      <IoMdHeartEmpty className="text-blackSecond" size={20} />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MadeOnFiverr;
