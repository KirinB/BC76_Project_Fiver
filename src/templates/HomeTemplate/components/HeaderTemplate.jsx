import React, { useEffect, useMemo, useState } from "react";
import Icons from "../../../components/icon";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import {
  ButtonGhost,
  ButtonOutline,
} from "../../../components/button/ButtonCustom";
import { AiOutlineGlobal } from "react-icons/ai";
import InputSearch from "../../../components/input/inputSearch/InputSearch";
import { useSelector } from "react-redux";
import { congViecService } from "../../../services/congViec.service";
import { useDebounce } from "use-debounce";
import { Dropdown } from "antd";
import "./HeaderTemplate.scss";
import useViewPort from "../../../hooks/useViewPort";
import DropdownCustom from "../../../components/dropdown/DropdownCustom";

const HeaderTemplate = () => {
  const { width } = useViewPort();

  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const { user } = useSelector((state) => {
    return state.userSlice;
  });
  // console.log(user);
  const navigate = useNavigate();

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleClickInputSearch = () => {
    setIsOpenDropdown(true);
  };

  // useMemo : cứ mỗi lần setState => re-render => cập nhật chạy mới toàn bộ các biến cũng như fnc bên trong => quản lí các biến giúp kiểm tra khi nào thì nên tạo mới
  // useCallback => quản lí các function

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

  const itemListSearch = useMemo(() => {
    return listSearch.slice(0, 4).map((item) => {
      // console.log(item);
      return {
        key: item.id,
        label: (
          <Link
            to={`${pathDefault.product}?id=${item.id}`}
            className="flex items-center"
          >
            <img src={item.congViec.hinhAnh} className="w-16 h-16 mr-4" />
            <div>
              <h4 className="text-lg font-semibold">
                {item.congViec.tenCongViec}
              </h4>
              <p className="mt-2">Đánh giá :{item.congViec.danhGia}</p>
            </div>
          </Link>
        ),
      };
    });
  }, [listSearch]);

  return (
    <header className="py-4 border-b border-b-gray-200">
      <div className="container">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center space-x-20 flex-1">
            <div>
              <Link to={pathDefault.homePage}>
                <Icons.logo />
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              {width > 1024 && (
                <Dropdown
                  // trigger={["click"]}
                  overlayClassName="dropdown-suggest"
                  menu={{
                    items: itemListSearch,
                    onMouseLeave: () => {
                      setIsOpenDropdown(false);
                    },
                  }}
                  open={isOpenDropdown}
                >
                  <div className="w-full">
                    <InputSearch
                      handleClick={handleClickInputSearch}
                      value={keyword}
                      onSearch={(value) => {
                        navigate(
                          `search-jobs?search=${encodeURIComponent(value)}`
                        );
                      }}
                      handleChange={handleChangeKeyword}
                      placeholder={"Search for any service..."}
                    />
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
          <div>
            <div className="space-x-3 flex items-center">
              <DropdownCustom buttonContent="Fiverr Pro" />
              <DropdownCustom buttonContent="Explore" />
              <ButtonGhost
                content={"English"}
                icon={<AiOutlineGlobal />}
              ></ButtonGhost>
              <ButtonGhost content={"Become a Seller"}></ButtonGhost>
              {!user ? (
                <>
                  {" "}
                  <ButtonGhost
                    onClick={() => {
                      navigate(pathDefault.signIn);
                    }}
                    content={"Sign in"}
                  ></ButtonGhost>
                  <ButtonOutline
                    onClick={() => {
                      navigate(pathDefault.signIn);
                    }}
                    content={"Join"}
                  ></ButtonOutline>{" "}
                </>
              ) : (
                user.name
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTemplate;
