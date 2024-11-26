import React, { useContext, useEffect } from "react";
import Icons from "../../components/icon";
import {
  InputCustom,
  InputPasswordCustom,
} from "../../components/input/inputCustom/InputCustom";
import { Checkbox, DatePicker } from "antd";
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
import SelectCustom from "../../components/selectCustom/SelectCustom";
import { nguoiDungService } from "../../services/nguoiDung.service";

const notificationRequired = "Vui lòng không bỏ trống";

const SignIn = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      repassword: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "USER",
      skill: [],
      certification: [],
    },
    onSubmit: (values) => {
      const { repassword, ...dataToSend } = values;
      console.log(dataToSend);
      nguoiDungService
        .themNguoiDung(dataToSend)
        .then((res) => {
          console.log(res);
          handleNotification("success", "Đăng ký thành công!", 1500);
          setTimeout(() => {
            navigate(pathDefault.signIn);
          }, 1500);
        })
        .catch((err) => {
          handleNotification("error", err.response.data.content);
        });
    },
    validationSchema: Yup.object({
      name: Yup.string().required(notificationRequired),
      email: Yup.string()
        .required(notificationRequired)
        .email("Vui lòng nhập đúng định dạng email"),
      password: Yup.string()
        .required(notificationRequired)
        .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
          "Vui lòng nhập ít nhất 1 chữ in hoa, 1 ký tự đặc biệt, 1 số"
        ),
      repassword: Yup.string()
        .required(notificationRequired)
        .oneOf([Yup.ref("password"), null], "Cần nhập mật khẩu trùng khớp"),
      phone: Yup.string()
        .required(notificationRequired)
        .matches(
          /^(0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9]))\d{7}$/,
          "Vui lòng nhập đúng định dạng số điện thoại Việt Nam"
        ),
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
            <h1 className="text-2xl lg:text-3xl font-semibold mb-2">
              Get Started Now
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="w-full space-y-4 lg:space-y-2"
          >
            <InputCustom
              placeholder={"Enter your name"}
              labelContent={"Name"}
              name={"name"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.name}
              touched={touched.name}
              error={errors.name}
            />
            <InputCustom
              placeholder={"Enter your email"}
              labelContent={"Email address"}
              name={"email"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.email}
              touched={touched.email}
              error={errors.email}
            />
            <InputPasswordCustom
              placeholder={"Enter your password"}
              labelContent={"Password"}
              name={"password"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.password}
              touched={touched.password}
              error={errors.password}
            />
            <InputPasswordCustom
              placeholder={"Enter your password"}
              labelContent={"Confirm password"}
              name={"repassword"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.repassword}
              touched={touched.repassword}
              error={errors.repassword}
            />
            <InputCustom
              placeholder={"Enter your phone"}
              labelContent={"Phone"}
              name={"phone"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.phone}
              touched={touched.phone}
              error={errors.phone}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-medium text-sm">Ngày sinh</label>
                <DatePicker
                  onChange={(date, dateString) => {
                    setFieldValue("birthday", dateString);
                  }}
                  format="DD-MM-YYYY"
                  className="w-full"
                />
              </div>
              <SelectCustom
                handleChange={(value, option) => {
                  setFieldValue("gender", value);
                }}
                labelContent={"Giới tính"}
                options={[
                  { label: "Nam", value: true },
                  { label: "Nữ", value: false },
                ]}
              />
            </div>

            <div className="flex justify-between items-center">
              <Checkbox>
                <span className="text-xs">I agree to the terms & policy</span>
              </Checkbox>
            </div>
            <ButtonPrimary
              className="w-full rounded-xl !bg-[#3A5B22]"
              content={"Signup"}
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
              Have an account?{" "}
              <Link
                to={pathDefault.signIn}
                className="text-[#0C2A92] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-full">
        <img
          className="w-full min-h-screen rounded-s-[45px] h-full object-cover"
          src="/signinbackground.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default SignIn;
