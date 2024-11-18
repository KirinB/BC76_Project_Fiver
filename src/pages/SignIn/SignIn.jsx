import React, { useContext } from "react";
import Icons from "../../components/icon";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Input } from "antd";
import { ButtonOutline } from "../../components/button/ButtonCustom";
import Lottie from "react-lottie";
import * as animationData from "./../../assets/animation/loginAnimation.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import { http } from "../../services/config";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../store/slice/user.slice";

const SignIn = () => {
  const dispatch = useDispatch();
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
        // sử dụng axios để xử lí đăng nhập
        // sử dụng then catch để xử lí kết quả trả về
        authService
          .signIn(values)
          .then((res) => {
            console.log(res);
            // thực hiện khi đăng nhập thành công sẽ lưu dữ liệu dưới localStorage

            localStorage.setItem("userInfo", JSON.stringify(res.data.content));
            // hiển thị thông báo thành công
            handleNotification("success", "Đăng nhập thành công", 1500);
            //thay đổi dữ liệu cho redux và chuyển người dùng về trang chủ
            dispatch(handleUpdateUser(res.data.content.user));
            setTimeout(() => {
              navigate(pathDefault.homePage);
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
            handleNotification("error", err.response.data.content);
          });
      },
      //validationSchema
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Vui lòng nhập đúng định dạng email")
          .required("Vui lòng không bỏ trống"),
        password: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen grid grid-cols-3 py-10">
      <div className="col-span-2 h-full flex items-center">
        {/* animation  */}
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="h-full px-10 flex flex-col justify-between">
        {/* logo and back to homepage  */}
        <div className="flex justify-between items-center">
          <Icons.logo />
          <div>
            <Link
              className="flex items-center space-x-2"
              to={pathDefault.homePage}
            >
              <FaArrowLeftLong />
              <span>Go back</span>
            </Link>
          </div>
        </div>
        {/* form  */}
        <div>
          <h1 className="text-4xl font-semibold mb-2">Trang đăng nhập</h1>
          <p className="text-gray-500 mb-4">Nhập email để bắt đầu truy cập</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <Input
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập Email"
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Mật khẩu</label>
              <Input
                name="password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập mật khẩu"
              />
              {errors.password && touched.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div>
              <ButtonOutline
                type="submit"
                content={"Đăng nhập"}
                className="w-full !py-4"
              />
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
