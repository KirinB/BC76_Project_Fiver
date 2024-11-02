import React from "react";
import Icons from "../../components/icon";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Input } from "antd";
import { ButtonOutline } from "../../components/button/ButtonCustom";

const SignIn = () => {
  return (
    <div className="h-screen grid grid-cols-3 py-10">
      <div className="col-span-2 h-full bg-red-500"></div>
      <div className="h-full px-10 flex flex-col justify-between">
        {/* logo and back to homepage  */}
        <div className="flex justify-between items-center">
          <Icons.logo />
          <div className="flex items-center">
            <FaArrowLeftLong />
            <Link to={pathDefault.homePage}>Go back</Link>
          </div>
        </div>
        {/* form  */}
        <div>
          <h1>Trang đăng nhập</h1>
          <p>Nhập email để bắt đầu truy cập</p>
          <form>
            <div>
              <label>Email</label>
              <Input placeholder="Vui lòng nhập Email" />
            </div>
            <div>
              <label htmlFor="">Mật khẩu</label>
              <Input placeholder="Vui lòng nhập mật khẩu" />
            </div>
            <div>
              <ButtonOutline content={"Đăng nhập"} className="w-full !py-4" />
            </div>
          </form>
        </div>
        {/* register  */}
        <div>
          <span>
            Chưa có tài khoản?{" "}
            <Link
              className="font-medium hover:underline duration-200"
              to={pathDefault.signUp}
            >
              đăng ký tại đây
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
