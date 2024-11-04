import React from "react";
import { Link } from "react-router-dom";
const dataServices = [
  {
    img: "/3d_industrial.png",
    title: "3D Industrial Design",
  },
  {
    img: "/E-commerce.png",
    title: "E-commerce Website Development",
  },
  {
    img: "/Email-Marketing.png",
    title: "Email Marketing",
  },
  {
    img: "/Press-Releases.png",
    title: "Press Releases",
  },
  {
    img: "/Logo-Design.png",
    title: "Logo Design",
  },
];

const VideoServicesHomePage = () => {
  return (
    <>
      <div>
        <h2 className="text-5xl mb-4 text-[#404145]">
          What success on Fiverr looks like
        </h2>
        <p className="text-[#62646A] mb-10">
          Vontélle Eyewear turns to Fiverr freelancers to bring their vision to
          life.
        </p>
        <video className="rounded-xl w-full" controls autoPlay muted>
          <source src="/Vontelle.mp4"></source>
        </video>
      </div>
      <div>
        <h3 className="text-3xl mb-8 text-blackSecond">
          Vontélle's go-to services
        </h3>
        <div className="grid grid-cols-5">
          {dataServices.map((item, index) => {
            return (
              <div className="px-[14px] py-3" key={index}>
                <Link
                  to={"#"}
                  className="py-[16px] min-h-[190px] p-4 inline-flex flex-col justify-center items-center gap-5 shadow-lg hover:shadow-md text-center w-full rounded-2xl border border-gray-100"
                >
                  <img className="w-1/3" src={item.img} alt="" />
                  <p className="text-blackSecond font-semibold">{item.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VideoServicesHomePage;
