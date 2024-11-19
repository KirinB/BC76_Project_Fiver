import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../components/input/inputCustom/InputCustom";
import "./signInAdmin.scss";
import { Link, useNavigate } from "react-router-dom";
import { ButtonGreen, ButtonIcon } from "../../components/button/ButtonCustom";
import Icons from "../../components/icon";
import { pathDefault } from "../../common/path";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { NotificationContext } from "../../App";
import { handleUpdateUser } from "../../store/slice/user.slice";
const SignInAdmin = () => {
  const dispatch = useDispatch();
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
        authService
          .signIn(values)
          .then((res) => {
            console.log(res);
            setUser(res.data.content);
            //kiểm tra user có phải admin k ?
          })
          .catch((err) => {
            console.log(err);
            handleNotification("error", err.response.data.content);
          });
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Vui lòng nhập đúng định dạng email")
          .required("Vui lòng không bỏ trống"),
        password: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });
  useEffect(() => {
    if (user) {
      if (user.user.role == "ADMIN") {
        localStorage.setItem("userInfo", JSON.stringify(user));
        handleNotification("success", "Đăng nhập thành công", 1500);
        dispatch(handleUpdateUser(user.user));
        setTimeout(() => {
          navigate(pathDefault.admin);
        }, 1500);
      } else {
        handleNotification(
          "error",
          "Bạn không có quyền truy cập trang này",
          1500
        );
        setTimeout(() => {
          navigate(pathDefault.homePage);
        }, 1500);
      }
    }
  }, [user]);
  return (
    <div id="signIn" className="h-screen">
      <div className="container">
        <div className="signIn h-screen flex justify-center items-center">
          <div className="w-full signIn_content p-14 rounded-xl">
            {/* Logo and back to homepage */}
            <div className="signIn_Logo flex justify-between items-center mb-10">
              <Icons.logo />
              <div>
                <Link
                  className="flex items-center space-x-2 text-gray-700 duration-200 hover:text-white font-semibold"
                  to={pathDefault.homePage}
                >
                  <FaArrowLeftLong />
                  <span>Go back</span>
                </Link>
              </div>
            </div>
            {/* form */}
            <div className="signIn_Form text-white font-semibold">
              <h1 className="text-5xl mb-8 text-center">Login</h1>
              <form
                action=""
                onSubmit={handleSubmit}
                className="space-y-4 text-lg"
              >
                <InputCustom
                  name={"email"}
                  value={values.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  labelContent="Email"
                  placeholder="Vui lòng nhập Email"
                  error={errors.email}
                  touched={touched.email}
                />
                <InputCustom
                  type="password"
                  name={"password"}
                  value={values.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  labelContent="password"
                  placeholder="Vui lòng nhập password"
                  error={errors.password}
                  touched={touched.password}
                />
                <div>
                  <Link className="hover:underline text-lg">
                    forgot Password ?
                  </Link>
                </div>
                <div>
                  <ButtonGreen
                    type="submit"
                    content={"Sign In"}
                    className="w-full"
                  />
                </div>
              </form>
            </div>
            {/* icon mail login */}
            <div className="text-center space-y-5 m-8">
              <p className="text-xl text-white">or continue with</p>
              <div className="flex justify-center gap-10 items-center">
                <ButtonIcon icon={"/google.svg"} />
                <ButtonIcon icon={"/github-mark.svg"} />
                <ButtonIcon icon={"/icons8-facebook.svg"} />
              </div>
            </div>
            {/* resister */}
            <div className="text-white text-lg text-center">
              <span>
                Chưa có tài khoản?{" "}
                <Link
                  className="font-bold hover:underline duration-200"
                  to={pathDefault.signUp}
                >
                  đăng ký tại đây
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInAdmin;
