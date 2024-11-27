import React, { useContext, useEffect, useMemo, useState } from "react";
import Icons from "../../../components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import {
  ButtonGhost,
  ButtonOutline,
  ButtonPrimary,
} from "../../../components/button/ButtonCustom";
import { AiOutlineGlobal } from "react-icons/ai";
import InputSearch from "../../../components/input/inputSearch/InputSearch";
import { useSelector } from "react-redux";
import { congViecService } from "../../../services/congViec.service";
import { useDebounce } from "use-debounce";
import { Avatar, Dropdown } from "antd";
import "./HeaderTemplate.scss";
import useViewPort from "../../../hooks/useViewPort";
import DropdownCustom from "../../../components/dropdown/DropdownCustom";
import { FaBars } from "react-icons/fa";

const HeaderTemplate = () => {
  const { width } = useViewPort();
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
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

  const handleOpenBar = () => {
    setOverlayVisible(true);
  };

  const handleCloseBar = () => {
    setOverlayVisible(false);
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
    <>
      <header className="py-4 border-b border-b-gray-200 fixed z-40 bg-white w-full shadow-sm">
        <div className="container">
          <div className="flex justify-between items-center gap-4 px-4 lg:px-0">
            <div
              className="lg:hidden w-[60px]"
              onClick={() => {
                handleOpenBar();
              }}
            >
              <FaBars size={20} />
            </div>
            <div className="flex justify-center lg:justify-start items-center space-x-20 flex-1">
              <div>
                <Link to={pathDefault.homePage}>
                  <Icons.logo />
                </Link>
              </div>
              <div className="hidden flex-1 lg:flex justify-center">
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
            <div className="lg:hidden">
              {!user ? (
                <>
                  <ButtonOutline
                    onClick={() => {
                      navigate(pathDefault.signUp);
                    }}
                    content={"Join"}
                  ></ButtonOutline>
                </>
              ) : (
                <div className="cursor-pointer">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: (
                            <p
                              className="px-4 py-1"
                              onClick={() => {
                                localStorage.removeItem("userInfo");
                                navigate(pathDefault.homePage);
                                window.location.reload();
                              }}
                            >
                              Log out
                            </p>
                          ),
                        },
                      ],
                    }}
                    placement="bottom"
                    arrow={{ pointAtCenter: true }}
                  >
                    <Avatar size={30} className="bg-[#fde3cf] ">
                      <p className="text-[#f56a00] text-lg uppercase">
                        {user.name[0]}
                      </p>
                    </Avatar>
                  </Dropdown>
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <div className="space-x-3 flex items-center">
                <DropdownCustom
                  buttonContent="Fiverr Pro"
                  className="font-semibold !text-[#222325]"
                  items={[
                    {
                      label: (
                        <div className="px-4 py-2 border rounded-lg">
                          <div className="flex gap-4">
                            <div className="flex items-center justify-center">
                              <img src="/hire-freelancer.svg" />
                            </div>
                            <div className="max-w-[280px]">
                              <h2 className="text-[#404145] font-semibold text-base">
                                I'm looking to hire
                              </h2>
                              <p className="text-[#62646a]">
                                My team needs vetted freelance talent and a
                                premium business solution.
                              </p>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="px-4 py-2 border rounded-lg">
                          <div className="flex gap-4">
                            <div className="flex items-center justify-center">
                              <img src="/iam-freelancer.svg" />
                            </div>
                            <div className="max-w-[280px]">
                              <h2 className="text-[#404145] font-semibold text-base">
                                I want to offer Pro services
                              </h2>
                              <p className="text-[#62646a]">
                                I'd like to work on business projects as a Pro
                                freelancer or agency.
                              </p>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
                <DropdownCustom
                  buttonContent="Explore"
                  items={[
                    {
                      label: (
                        <div className="py-1">
                          <h1 className="font-semibold text-base">Answers</h1>
                          <p className="#62646a">
                            Powered by AI, answered by Fiverr freelancers
                          </p>
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="py-1">
                          <h1 className="font-semibold text-base">Community</h1>
                          <p className="#62646a">
                            Connect with Fiverr's team and community
                          </p>
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="py-1">
                          <h1 className="font-semibold text-base">Guides</h1>
                          <p className="#62646a">
                            In-depth guides covering bsiness topics
                          </p>
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="py-1">
                          <h1 className="font-semibold text-base">Podcast</h1>
                          <p className="#62646a">
                            Inside tips from top business minds
                          </p>
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="py-1">
                          <h1 className="font-semibold text-base">Learn</h1>
                          <p className="#62646a">
                            Professional online courses, led by experts
                          </p>
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="py-1">
                          <h1 className="font-semibold text-base">Blog</h1>
                          <p className="#62646a">
                            News, information and community stories
                          </p>
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="py-1">
                          <h1 className="font-semibold text-base">
                            Logo Maker
                          </h1>
                          <p className="#62646a">Create your logo instantly</p>
                        </div>
                      ),
                    },
                  ]}
                />
                <ButtonGhost
                  content={"English"}
                  className={"text-[#62646a]"}
                  icon={<AiOutlineGlobal />}
                ></ButtonGhost>
                <ButtonGhost
                  content={"Become a Seller"}
                  className={"text-[#62646a]"}
                ></ButtonGhost>
                {!user ? (
                  <>
                    {" "}
                    <ButtonGhost
                      onClick={() => {
                        navigate(pathDefault.signIn);
                      }}
                      className={"text-[#62646a]"}
                      content={"Sign in"}
                    ></ButtonGhost>
                    <ButtonOutline
                      onClick={() => {
                        navigate(pathDefault.signUp);
                      }}
                      content={"Join"}
                    ></ButtonOutline>
                  </>
                ) : (
                  <div className="cursor-pointer">
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "1",
                            label: (
                              <p
                                className="px-4 py-1"
                                onClick={() => {
                                  localStorage.removeItem("userInfo");
                                  navigate(pathDefault.homePage);
                                  window.location.reload();
                                }}
                              >
                                Log out
                              </p>
                            ),
                          },
                        ],
                      }}
                      placement="bottom"
                      arrow={{ pointAtCenter: true }}
                    >
                      <Avatar size={30} className="bg-[#fde3cf] ">
                        <p className="text-[#f56a00] text-lg uppercase">
                          {user.name[0]}
                        </p>
                      </Avatar>
                    </Dropdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {isOverlayVisible && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={handleCloseBar}
            ></div>

            {/* Overlay */}
            <div
              className={`absolute top-0 left-0 w-3/4 md:w-1/3 h-full bg-white transform transition-transform motion-preset-slide-right  ${
                isOverlayVisible ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan ra backdrop
            >
              <div className="p-6 h-full flex flex-col space-y-4">
                <div className="mb-5">
                  <ButtonPrimary
                    onClick={() => {
                      navigate(pathDefault.signUp);
                    }}
                    content={"Join Fiver"}
                  ></ButtonPrimary>
                </div>
                <Link
                  className="text-[#62646a] font-medium"
                  to={pathDefault.signIn}
                >
                  Sign in
                </Link>
                <DropdownCustom
                  buttonContent="Browse categories"
                  className="w-full flex justify-between !p-0 !font-medium !text-[#62646a]"
                />
                <DropdownCustom
                  buttonContent="Explore"
                  className="w-full flex justify-between !p-0 !font-medium !text-[#62646a]"
                />
                <DropdownCustom
                  buttonContent="Fiver Pro"
                  className="w-full flex justify-between !p-0 !font-semibold !text-[#62646a]"
                />
                <h1 className="font-semibold text-[#404145]">General</h1>
                <Link
                  to={pathDefault.homePage}
                  className="text-[#62646a] font-medium"
                >
                  Home
                </Link>
                <DropdownCustom
                  buttonContent={
                    <span className="flex items-center justify-center space-x-2">
                      <span>English</span>
                      <span>
                        <AiOutlineGlobal />
                      </span>
                    </span>
                  }
                  className="w-full flex justify-between !p-0 !font-medium !text-[#62646a]"
                />
                <DropdownCustom
                  buttonContent="US$ USD"
                  className="w-full flex justify-between !p-0 !font-medium !text-[#62646a]"
                />
                <p className="text-[#62646a] font-medium">Open in App</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderTemplate;
