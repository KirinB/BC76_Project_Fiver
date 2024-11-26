import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingCustom from "../../components/loading/LoadingCustom";
import { congViecService } from "../../services/congViec.service";
import CategoryNavbar from "../HomePage/components/CategoryNavbar";
import { Avatar, Breadcrumb, Button, Tabs, Tooltip } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { pathDefault } from "../../common/path";
import { loaiCongViecService } from "../../services/loaiCongViec.service";
import { IoMdHeart } from "react-icons/io";
import "./Product.scss";
import {
  ButtonOutline,
  ButtonPrimary,
} from "../../components/button/ButtonCustom";
import { GoShareAndroid } from "react-icons/go";
import { nguoiDungService } from "../../services/nguoiDung.service";
import Icons from "../../components/Icons";
import { FaArrowRightLong } from "react-icons/fa6";
import { mockUpComment } from "../../common/constant";
import ItemSearchJob from "../SearchJobs/ItemSearchJob";

const Product = () => {
  const [productParam] = useSearchParams();
  const productTerm = productParam.get("id");
  const [isLoading, setIsLoading] = useState(true);
  const [infoProduct, setInfoProduct] = useState({});
  const [loaiCongViec, setLoaiCongViec] = useState("");
  const [author, setAuthor] = useState();
  useEffect(() => {
    if (!productTerm) return;
    setIsLoading(true);
    congViecService
      .getCongViecTheoId(productTerm)
      .then((res) => {
        // console.log(res.data.content);
        setInfoProduct(res.data.content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }, [productParam]);

  useEffect(() => {
    if (!infoProduct?.maChiTietLoaiCongViec) return;

    loaiCongViecService
      .getChiTietLoaiCongViecById(infoProduct.maChiTietLoaiCongViec)
      .then((res) => {
        setLoaiCongViec(res.data.content.tenChiTiet);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [infoProduct.maChiTietLoaiCongViec]);

  useEffect(() => {
    if (!infoProduct?.nguoiTao) return;
    nguoiDungService
      .getNguoiDungById(infoProduct.nguoiTao)
      .then((res) => {
        // console.log(res.data.content);
        setAuthor(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [infoProduct.nguoiTao]);
  return (
    <>
      <CategoryNavbar />
      {isLoading ? (
        <div className="flex justify-center py-20">
          <LoadingCustom />
        </div>
      ) : (
        <>
          <div className="container py-10 px-6 lg:px-0">
            <div className="flex justify-between mb-10">
              <Breadcrumb
                items={[
                  {
                    title: (
                      <Link to={pathDefault.homePage}>
                        <HomeOutlined />
                      </Link>
                    ),
                  },

                  {
                    href: "",
                    title: <span>{loaiCongViec}</span>,
                  },
                ]}
              />
              <div className="hidden lg:flex items-center space-x-2 mr-20">
                <Tooltip title="Save to list">
                  <div className="pointer-events-auto cursor-pointer top-4 right-4 bg-white p-2 rounded-full">
                    <IoMdHeart fill="#b5b6ba" size={20} />
                  </div>
                </Tooltip>
                <span className="collect-count">161</span>
                <ButtonOutline
                  className="!border-gray-200 !text-blackSecond hover:!bg-gray-200 hover:!border-gray-300"
                  icon={<GoShareAndroid />}
                />
              </div>
            </div>
            <div className="lg:flex lg:relative">
              <div className="w-full lg:w-2/3 mr-20 space-y-6">
                <h1 className="pb-4 text-2xl lg:text-3xl font-semibold">
                  {infoProduct.tenCongViec}
                </h1>
                <div className="flex space-x-4">
                  <div>
                    <Link>
                      <img
                        src={author?.avatar}
                        className="w-11 h-11 lg:w-16 lg:h-16 rounded-full"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-evenly">
                    <div className="flex space-x-4 items-center">
                      <Link>
                        <p className="text-[#404145] text-lg font-semibold capitalize ">
                          {author?.name}
                        </p>
                      </Link>
                      <div className="w-px h-4/5 bg-[#e4e5e7]"></div>
                      <p className="text-[#74767e]">3 orders in queue</p>
                    </div>
                    <p className="flex items-baseline space-x-1">
                      {Array.from({ length: 5 }).map((item, index) => {
                        return index < infoProduct.saoCongViec ? (
                          <Icons.star key={index} />
                        ) : (
                          <Icons.starReg key={index} />
                        );
                      })}
                      <span className="font-semibold">
                        {infoProduct.saoCongViec.toFixed(1)}
                      </span>
                      <Link className="underline text-[#74767e]">
                        ({infoProduct.danhGia} reviews)
                      </Link>
                    </p>
                  </div>
                </div>
                <div>
                  <img className="w-full" src={infoProduct.hinhAnh} alt="" />
                </div>
                <div className="block lg:hidden w-full lg:mx-20 h-full right-0 top-10 space-y-4">
                  <div className="border border-gray-200 pt-8 px-6 space-y-4">
                    <div>
                      <h1 className="text-xl font-semibold">Basic</h1>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">✅ Basic Pack</p>
                      <p className="text-xl font-semibold">
                        US${infoProduct.giaTien}
                      </p>
                    </div>
                    <p className="text-[#62646a]">{infoProduct.moTaNgan}</p>
                    <div>
                      <button className="w-full bg-black  py-3 px-6 font-semibold rounded-md hover:opacity-80 flex items-center">
                        <p className="text-white text-center w-full">
                          Continue
                        </p>
                        <span>
                          <FaArrowRightLong fill="white" />
                        </span>
                      </button>
                      <div className="flex justify-center pt-3 pb-5">
                        <Link>Compare packages</Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#fafafa] p-6 rounded-lg">
                    <button className="font-semibold border-blackSecond text-blackSecond px-6 py-3 border rounded-md hover:opacity-80 hover:bg-blackSecond hover:text-white w-full">
                      Contact me
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="pb-6 text-xl font-semibold">About this gig</h2>
                  <p className="text-[#62646a] break-words text-lg">
                    {infoProduct.moTa}
                  </p>
                </div>
                <div>
                  <h2 className="pb-6 text-xl font-semibold">Reviews</h2>
                  <div className="space-y-8">
                    {mockUpComment.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className="border rounded-xl border-gray-200 px-6 py-4 space-y-6">
                            <div className="flex space-x-4">
                              <div>
                                <Avatar size={48} className="bg-[#fde3cf] ">
                                  <p className="text-[#f56a00] text-2xl uppercase">
                                    {item.author[0]}
                                  </p>
                                </Avatar>
                              </div>
                              <div className="flex-col space-y-1">
                                <div>
                                  <h3 className="font-semibold">
                                    {item.author}
                                  </h3>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <img className="w-4 h-4" src={item.flag} />
                                  <span className="text-sm text-[#74767e]">
                                    {item.region}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="h-px w-full bg-gray-200"></div>
                            <div className="flex justify-between">
                              <div className="flex flex-col space-y-3">
                                <div className="flex items-baseline space-x-2">
                                  <div className="flex space-x-1">
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => {
                                        return index < item.rate ? (
                                          <Icons.star key={index} />
                                        ) : (
                                          <Icons.starReg key={index} />
                                        );
                                      }
                                    )}
                                  </div>
                                  <p className=" font-semibold">{item.rate}</p>
                                </div>
                                <p>{item.content}</p>
                                <div className="flex space-x-12 items-center">
                                  <div className="flex flex-col">
                                    <p className="font-semibold">
                                      {item.price}
                                    </p>
                                    <p className="text-sm text-[#74767e]">
                                      Price
                                    </p>
                                  </div>
                                  <div className="w-px h-[26px] bg-gray-200"></div>
                                  <div className="flex flex-col">
                                    <p className="font-semibold">
                                      {item.duration}
                                    </p>
                                    <p className="text-sm text-[#74767e]">
                                      Duration
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="hidden md:block">
                                <img
                                  src={item.image}
                                  className="w-[144px] h-[86px] object-cover rounded-md"
                                  alt=""
                                />
                              </div>
                            </div>
                            <img
                              src={item.image}
                              className="w-[293px] h-[175px] object-cover rounded-md md:hidden lg:hidden"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <aside className="hidden lg:block w-1/3 mx-20 h-full sticky right-0 top-10 space-y-4">
                <div className="border border-gray-200 pt-8 px-6 space-y-4">
                  <div>
                    <h1 className="text-xl font-semibold">Basic</h1>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">✅ Basic Pack</p>
                    <p className="text-xl font-semibold">
                      US${infoProduct.giaTien}
                    </p>
                  </div>
                  <p className="text-[#62646a]">{infoProduct.moTaNgan}</p>
                  <div>
                    <button className="w-full bg-black  py-3 px-6 font-semibold rounded-md hover:opacity-80 flex items-center">
                      <p className="text-white text-center w-full">Continue</p>
                      <span>
                        <FaArrowRightLong fill="white" />
                      </span>
                    </button>
                    <div className="flex justify-center pt-3 pb-5">
                      <Link>Compare packages</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-[#fafafa] p-6 rounded-lg">
                  <button className="font-semibold border-blackSecond text-blackSecond px-6 py-3 border rounded-md hover:opacity-80 hover:bg-blackSecond hover:text-white w-full">
                    Contact me
                  </button>
                </div>
              </aside>
            </div>
          </div>
          <div className="mt-20 border-t border-gray-200 bg-[#f5f5f5] py-8">
            <div className="container py-8 px-6 lg:px-0">
              <h2 className="text-[#404145] text-xl lg:text-2xl font-semibold mb-10">
                People Who Viewed This Service Also Viewed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 ">
                {Array.from({ length: 5 }).map((item, i) => {
                  return (
                    <ItemSearchJob
                      author={"admin"}
                      idProduct={i + 1}
                      imgAuthor={
                        "http://sc04.alicdn.com/kf/Hc3e61591078043e09dba7808a6be5d21n.jpg"
                      }
                      imgBg={`https://fiverrnew.cybersoft.edu.vn/images/cv${
                        i + 1
                      }.jpg`}
                      price={22}
                      rate={145}
                      star={3}
                      title={
                        "I will design unique minimalist modern and creative logo design"
                      }
                      key={i + 1}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
