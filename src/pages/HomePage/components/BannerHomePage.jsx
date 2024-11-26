import React, { useEffect, useState } from "react";
import InputSearch from "../../../components/input/inputSearch/InputSearch";
import CategoryHomePage from "./CategoryHomePage";
import Icons from "../../../components/Icons";
import { listCategories } from "../../../common/constant";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { congViecService } from "../../../services/congViec.service";
const BannerHomePage = () => {
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const navigate = useNavigate();
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    if (value) {
      congViecService
        .getCongViecTheoTen(value)
        .then((res) => {
          setListSearch(res.data.content);
          setIsOpenDropdown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);
  return (
    <div>
      <div className="bg-gradient-to-t from-[#3d774c] to-[#003912] lg:bg-banner-homepage lg:h-[500px] w-full bg-no-repeat bg-center bg-cover rounded-none lg:rounded-2xl relative">
        <div className="flex flex-col justify-center h-full items-center gap-10 py-10 px-5">
          <h1 className="text-white text-3xl lg:text-6xl tracking-tight leading-[69px] max-w-[800px] text-center">
            Scale your professional workforce with{" "}
            <span className="font-dancing italic">freelancers</span>
          </h1>
          <InputSearch
            className={"w-full"}
            value={keyword}
            onSearch={(value) => {
              navigate(`search-jobs?search=${encodeURIComponent(value)}`);
            }}
            handleChange={handleChangeKeyword}
            placeholder={"Search for any service..."}
          />
        </div>
        <div className="hidden absolute bottom-5 w-full lg:flex justify-center gap-10 opacity-40">
          <span className="text-white text-xs">Trusted by:</span>
          <ul className="flex gap-10">
            <li>
              <Icons.metaLogo />
            </li>
            <li>
              <Icons.googleLogo />
            </li>
            <li>
              <Icons.netflixLogo />
            </li>
            <li>
              <Icons.pgLogo />
            </li>
            <li>
              <Icons.paypalLogo />
            </li>
            <li>
              <Icons.payoneerLogo />
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-9 p-3 lg:space-x-4 gap-y-4 lg:gap-y-0">
        {listCategories.map((item, index) => {
          return (
            <CategoryHomePage key={index} icon={item.icon} title={item.title} />
          );
        })}
      </div>
    </div>
  );
};

export default BannerHomePage;
