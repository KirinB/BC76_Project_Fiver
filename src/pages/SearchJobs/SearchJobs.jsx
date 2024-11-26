import { Pagination, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";
import CategoryNavbar from "../HomePage/components/CategoryNavbar";
import DropdownCustom from "../../components/dropdown/DropdownCustom";
import ItemSearchJob from "./ItemSearchJob";
import LoadingCustom from "../../components/loading/LoadingCustom";
import useViewPort from "../../hooks/useViewPort";
import InputSearch from "../../components/input/inputSearch/InputSearch";
import { useDebounce } from "use-debounce";

const SearchJobs = () => {
  const { width } = useViewPort();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [listJobs, setListJobs] = useState([]);
  const searchTerm = searchParams.get("search");
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    if (value) {
      congViecService
        .getCongViecTheoTen(value)
        .then((res) => {
          // console.log(res);
          setListSearch(res.data.content);
          setIsOpenDropdown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);
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
          <div className="px-6 mb-4 w-full lg:hidden">
            <InputSearch
              className="w-full !max-w-none"
              value={keyword}
              onSearch={(value) => {
                setSearchParams(`search=${value}`);
              }}
              handleChange={handleChangeKeyword}
              placeholder={"Search for any service..."}
            />
          </div>
          <div className="space-y-8">
            <h1 className="text-xl lg:text-3xl px-6 lg:px-0">
              Results for <span className="font-semibold">{searchTerm}</span>
            </h1>
            <div className="flex justify-between items-center px-6 lg:px-0">
              <div className="hidden lg:block space-x-3">
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
                <Switch size={width < 768 ? "default" : "small"} />
                <span className="text-[#62646a] font-semibold">
                  Pro services
                </span>
              </div>
            </div>
            <div className="px-6 lg:px-0 flex justify-between items-center text-[#74767e] ">
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
            <div className="px-6 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
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
