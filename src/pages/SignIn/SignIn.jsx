import React, { useContext, useEffect } from "react";
import Icons from "../../components/Icons";
import {
  InputCustom,
  InputPasswordCustom,
} from "../../components/input/inputCustom/InputCustom";
import { Checkbox } from "antd";
import {
  ButtonOutline,
  ButtonPrimary,
} from "../../components/button/ButtonCustom";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { NotificationContext } from "../../App";
import { pathDefault } from "../../common/path";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../store/slice/user.slice";

const SignIn = () => {
  const dispatch = useDispatch();
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const { handleSubmit, handleBlur, handleChange, errors, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        authService
          .signIn(values)
          .then((res) => {
            clg;
            localStorage.setItem("userInfo", JSON.stringify(res.data.content));
            handleNotification("success", "Đăng nhập thành công", 1500);
            dispatch(handleUpdateUser(res.data.content.user));
            setTimeout(() => {
              navigate(pathDefault.homePage);
            }, 1500);
          })
          .catch((err) => {
            handleNotification("error", err.response.data.content);
          });
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Vui lòng không bỏ trống")
          .email("Vui lòng nhập đúng định dạng email"),
        password: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user?.token) {
      navigate(pathDefault.homePage);
    }
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-6 py-10 md:px-10 md:py-14 bg-[url('/signinbackground.png')] bg-cover lg:bg-none lg:p-0">
      <div className="flex flex-col justify-center min-h-screen overflow-y-auto items-center border lg:border-none border-gray-200 px-4 py-10 bg-white opacity-95 rounded-lg">
        <div className="lg:w-[400px]">
          <div className="mb-10">
            <div className="mb-4">
              <Link to={pathDefault.homePage}>
                <Icons.logo />
              </Link>
            </div>
            <h1 className=" text-2xl lg:text-3xl font-semibold mb-2">
              Welcome back!
            </h1>
          </div>
          <form onSubmit={handleSubmit} action="" className="w-full space-y-5">
            <InputCustom
              placeholder={"Enter your email"}
              labelContent={"Email address"}
              name={"email"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              value={values.email}
            />
            <InputPasswordCustom
              placeholder={"Enter your password"}
              labelContent={"Password"}
              name={"password"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              value={values.password}
            />
            <div className="flex justify-between items-center">
              <Checkbox>
                <span className="text-xs">Remember for 30 days</span>
              </Checkbox>
              <Link className="text-xs text-[#0C2A92] hover:underline">
                Forgot password?
              </Link>
            </div>
            <ButtonPrimary
              className="w-full rounded-xl !bg-[#3A5B22]"
              content={"Login"}
              type="submit"
            />
          </form>
          <div className="h-px w-full bg-gray-200 mt-10 relative">
            <span className="absolute top-2/4 right-2/4 -translate-y-2/4 translate-x-2/4 bg-white text-sm">
              Or
            </span>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            <ButtonOutline
              content={"Sign in with Google"}
              className="!border-gray-300 !text-blackSecond hover:!bg-gray-100 !rounded-xl text-sm !py-2"
              onClick={() => {
                handleNotification("error", "Chức năng chưa được cập nhật");
              }}
              icon={<FcGoogle />}
            />
            <ButtonOutline
              content={"Sign in with Apple"}
              className="!border-gray-300 !text-blackSecond hover:!bg-gray-100 !rounded-xl text-sm !py-2"
              onClick={() => {
                handleNotification("error", "Chức năng chưa được cập nhật");
              }}
              icon={<SiApple />}
            />
          </div>
          <div className="mt-10 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link
                to={pathDefault.signUp}
                className="text-[#0C2A92] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-full">
        <img
          className="w-full min-h-screen rounded-s-[45px] object-cover"
          src="/signinbackground.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default SignIn;
