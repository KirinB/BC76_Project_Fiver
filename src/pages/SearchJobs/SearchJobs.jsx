import { Pagination, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";
import CategoryNavbar from "../HomePage/components/CategoryNavbar";
import DropdownCustom from "../../components/dropdown/DropdownCustom";
import ItemSearchJob from "./ItemSearchJob";
import LoadingCustom from "../../components/loading/LoadingCustom";

const SearchJobs = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [listJobs, setListJobs] = useState([]);
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    if (!searchTerm) return;
    setIsLoading(true);
    congViecService
      .getCongViecTheoTen(searchTerm)
      .then((res) => {
        // console.log(res.data.content);
        setListJobs(res.data.content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }, [searchTerm]);

  return (
    <>
      <CategoryNavbar />

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingCustom />
        </div>
      ) : (
        <div className="py-10 container">
          <div className="space-y-8">
            <h1 className="text-3xl ">
              Results for <span className="font-semibold">{searchTerm}</span>
            </h1>
            <div className="flex justify-between items-center">
              <div className="space-x-3">
                <DropdownCustom
                  buttonContent="Category"
                  className="border border-gray-200"
                />
                <DropdownCustom
                  buttonContent="Logo options"
                  className="border border-gray-200"
                />
                <DropdownCustom
                  buttonContent="Seller details"
                  className="border border-gray-200"
                />
                <DropdownCustom
                  buttonContent="Budget"
                  className="border border-gray-200"
                />
                <DropdownCustom
                  buttonContent="Dellvery time"
                  className="border border-gray-200"
                />
              </div>
              <div className="space-x-2 flex justify-center items-center">
                <Switch size="small" />
                <span className="text-[#62646a] font-semibold">
                  Pro services
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[#74767e] ">
              <p>
                <span>{listJobs.length}</span> results
              </p>
              <div className="flex items-center justify-center">
                <p>Sort by: </p>
                <DropdownCustom
                  buttonContent="Relevance"
                  className="px-2 text-blackSecond"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-y-10 gap-x-6">
              {listJobs.map((item, index) => {
                return (
                  <ItemSearchJob
                    key={index}
                    idProduct={item.id}
                    imgBg={item.congViec.hinhAnh}
                    imgAuthor={item.avatar}
                    author={item.tenNguoiTao}
                    title={item.congViec.tenCongViec}
                    star={item.congViec.saoCongViec}
                    rate={item.congViec.danhGia}
                    price={item.congViec.giaTien}
                  />
                );
              })}
            </div>
            <div className="flex justify-center">
              <Pagination defaultCurrent={1} total={1} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchJobs;
