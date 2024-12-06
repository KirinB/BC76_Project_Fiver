import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, theme } from "antd";
import Icons from "../../components/Icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { pathDefault } from "../../common/path";
const { Header, Sider, Content } = Layout;
import "./AdminTemplate.scss";
import { useSelector } from "react-redux";
import useViewPort from "../../hooks/useViewPort";
import { FaBars, FaFacebookF } from "react-icons/fa";
import { isPending } from "@reduxjs/toolkit";
const AdminTemplate = () => {
  const { width } = useViewPort();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(50);
  const handleOpenBar = () => {
    setOverlayVisible(true);
  };

  const handleCloseBar = () => {
    setOverlayVisible(false);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user } = useSelector((state) => state.userSlice);
  const items = [
    {
      key: "1",
      label: <Link>Thông tin cá nhân</Link>,
    },
    {
      key: "2",
      label: (
        <Link
          onClick={() => {
            localStorage.removeItem("userInfo");
            dispatch(handleUpdateUser(null));
            window.location.href = pathDefault.homePage;
          }}
        >
          Đăng xuất
        </Link>
      ),
    },
  ];
  useEffect(() => {
    //Kiem tra nguoi dung co dang nhap chua
    const dataString = localStorage.getItem("userInfo");
    if (!dataString) {
      //neu chua dang nhap thi chuyen huong ve trang login
      window.location.href = pathDefault.signInAdmin;
    } else {
      const data = JSON.parse(dataString);
      if (data.user.role !== "ADMIN") {
        window.location.href = pathDefault.homePage;
      }
    }
  }, []);
  return (
    <Layout className="min-h-screen">
      {width >= 768 && (
        <Sider
          width={250}
          className="bg-slate-800 slider-content"
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={collapsedWidth} // Chiều rộng khi collapsed
          breakpoint="md"
          onBreakpoint={(broken) => {
            if (broken) {
              setCollapsed(true);
              setCollapsedWidth(0);
            } else {
              setCollapsedWidth(50);
            }
          }}
        >
          <div
            className={`flex justify-center ${collapsed ? "py-5" : "py-10"}`}
          >
            {collapsed ? (
              <Link to={pathDefault.homePage}>
                <FaFacebookF size={30} fill="white" />
              </Link>
            ) : (
              <Link to={pathDefault.homePage}>
                <Icons.logo fill="white" />
              </Link>
            )}
          </div>
          <Menu
            mode="inline"
            items={[
              {
                key: "1",
                label: (
                  <NavLink
                    className={({ isActive, isPending }) => {
                      return `px-3 rounded-md inline-block ${
                        isActive || location.pathname == "/admin"
                          ? "item-active"
                          : ""
                      }`;
                    }}
                    to={pathDefault.managerUser}
                  >
                    <UserOutlined />
                    <span>Danh sách người dùng</span>
                  </NavLink>
                ),
              },
              {
                key: "2",
                label: (
                  <NavLink
                    className={({ isActive, isPending }) => {
                      return `px-3 rounded-md inline-block ${
                        isActive ? "item-active" : ""
                      }`;
                    }}
                    to={pathDefault.managerJob}
                  >
                    <VideoCameraOutlined />
                    <span>Danh sách công việc</span>
                  </NavLink>
                ),
              },
              {
                key: "3",
                label: (
                  <NavLink
                    className={({ isActive, isPending }) => {
                      return `px-3 rounded-md inline-block ${
                        isActive ? "item-active" : ""
                      }`;
                    }}
                    to={pathDefault.managerComment}
                  >
                    <UploadOutlined />
                    <span>Danh sách bình luận</span>
                  </NavLink>
                ),
              },
            ]}
          />
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex h-full justify-between items-center">
            {width >= 768 && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            )}
            <div
              className="md:hidden w-[60px]"
              onClick={() => {
                handleOpenBar();
              }}
            >
              <FaBars size={20} className="ml-5" />
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
                  className={`absolute top-0 left-0 w-3/4 md:w-1/3 h-full bg-slate-800 text-white font-medium md:text-lg  sm:text-base text-sm transform transition-transform texmotion-preset-slide-right  ${
                    isOverlayVisible ? "translate-x-0" : "-translate-x-full"
                  }`}
                  onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan ra backdrop
                >
                  <div className="p-6 h-full flex flex-col space-y-6 navbar text-center">
                    <Link
                      className="flex justify-center"
                      to={pathDefault.homePage}
                    >
                      <Link to={pathDefault.homePage}>
                        <Icons.logo fill="white" />
                      </Link>
                    </Link>
                    <NavLink
                      className={({ isActive, isPending }) => {
                        return `p-2 rounded-md inline-block hover:text-white ${
                          isActive || location.pathname == "/admin"
                            ? "item_active"
                            : ""
                        }`;
                      }}
                      to={pathDefault.managerUser}
                    >
                      <span>Danh sách người dùng</span>
                    </NavLink>
                    <NavLink
                      className={({ isActive, isPending }) => {
                        return `p-2 rounded-md inline-block hover:text-white ${
                          isActive ? "item_active" : ""
                        }`;
                      }}
                      to={pathDefault.managerJob}
                    >
                      <span>Danh sách công việc</span>
                    </NavLink>
                    <NavLink
                      className={({ isActive, isPending }) => {
                        return `p-2 rounded-md inline-block hover:text-white ${
                          isActive ? "item_active" : ""
                        }`;
                      }}
                      to={pathDefault.managerComment}
                    >
                      <span>Danh sách bình luận</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
            <div>
              <Link to={pathDefault.homePage}>
                <Icons.logo />
              </Link>
            </div>
            <div className="admin flex gap-1 items-center">
              <p className="md:block hidden">
                Xin chào,{" "}
                <span className="font-semibold text-lg">
                  {user ? user.name : null}
                </span>
              </p>
              <Dropdown menu={{ items }}>
                <Avatar
                  size="large"
                  icon={
                    user ? (
                      user.avatar ? (
                        <img src={user.avatar} alt="" />
                      ) : (
                        <span>{user.name?.charAt(0)}</span>
                      )
                    ) : null
                  }
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  className="mx-5 uppercase"
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminTemplate;
