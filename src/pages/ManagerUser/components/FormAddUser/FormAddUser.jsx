import React, { useContext, useEffect, useState } from "react";
import { InputCustom } from "../../../../components/input/inputCustom/InputCustom";
import SelectCustom from "../../../../components/selectCustom/SelectCustom";
import { Button, DatePicker } from "antd";
import { useFormik } from "formik";
import { skillService } from "../../../../services/skill.service";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import { NotificationContext } from "../../../../App";
import * as Yup from "yup";

const FormAddUser = ({ handleCloseModal, layDanhSachNguoiDung }) => {
  const { handleNotification } = useContext(NotificationContext);
  const [listSkill, setListSkill] = useState([]);
  const {
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
      skill: [],
      certification: [],
    },
    onSubmit: (values) => {
      console.log(values);
      nguoiDungService
        .themNguoiDung(values)
        .then((res) => {
          console.log(res);
          handleCloseModal();
          layDanhSachNguoiDung();
          handleNotification("success", "Thêm người dùng thành công");
        })
        .catch((err) => {
          handleNotification("error", err.response.data.content);
        });
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng không bỏ trống !"),
      email: Yup.string()
        .required("Vui lòng không bỏ trống !")
        .email("Vui lòng nhập đúng định dạng email !"),
      password: Yup.string()
        .required("Vui lòng không bỏ trống !")
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
          "Vui lòng nhập 1 ký tự đặc biệt, 1 in hoa, 1 số"
        ),
      phone: Yup.string()
        .required("Vui lòng không bỏ trống !")
        .matches(
          /^(0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])\d{7})$/,
          "Vui lòng nhập đúng định dạng số điện thoại Việt Nam"
        ),
      role: Yup.string().required("Vui lòng không bỏ trống !"),
      birthday: Yup.string().required("Vui lòng không bỏ trống !"),
      gender: Yup.string().required("Vui lòng không bỏ trống !"),
      skill: Yup.array().min(1, "Vui lòng không bỏ trống !"),
      certification: Yup.array().min(1, "Vui lòng không bỏ trống !"),
    }),
  });
  useEffect(() => {
    skillService
      .layDanhSachSkill()
      .then((res) => {
        setListSkill(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputCustom
        id="name"
        name="name"
        value={values.name}
        handleBlur={handleBlur}
        handleChange={handleChange}
        error={errors.name}
        touched={touched.name}
        labelContent={"Họ tên"}
        placeholder={"Vui lòng nhập họ tên"}
      />
      <InputCustom
        id="email"
        name="email"
        value={values.email}
        handleBlur={handleBlur}
        handleChange={handleChange}
        error={errors.email}
        touched={touched.email}
        labelContent={"Email"}
        placeholder={"Vui lòng nhập email"}
      />
      <InputCustom
        id="password"
        name="password"
        value={values.password}
        handleBlur={handleBlur}
        handleChange={handleChange}
        error={errors.password}
        touched={touched.password}
        labelContent={"Password"}
        placeholder={"Vui lòng nhập mật khẩu"}
        type="password"
      />

      <div className="grid grid-cols-2 gap-5">
        <InputCustom
          id="phone"
          name="phone"
          value={values.phone}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.phone}
          touched={touched.phone}
          labelContent={"Số điện thoại"}
          placeholder={"Vui lòng nhập số điện thoại"}
        />
        <SelectCustom
          handleChange={(value, option) => {
            setFieldValue("role", value);
          }}
          labelContent={"Chức vụ"}
          options={[
            { label: "Admin", value: "ADMIN" },
            { label: "User", value: "USER" },
          ]}
          error={errors.role}
          touched={touched.role}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="font-medium block">Ngày sinh</label>
          <DatePicker
            onChange={(date, dateString) => {
              setFieldValue("birthday", dateString);
            }}
            format="DD-MM-YYYY"
            className="w-full"
          />
          {errors.birthday && touched.birthday && (
            <p className="text-red-500 text-sm">{errors.birthday}</p>
          )}
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
          error={errors.gender}
          touched={touched.gender}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <SelectCustom
          handleChange={(value, option) => {
            setFieldValue("skill", value);
          }}
          labelContent={"Skills"}
          mode={"tags"}
          options={listSkill.map((item) => {
            return {
              label: item.tenSkill,
              value: item.id.toString(),
            };
          })}
          error={errors.skill}
          touched={touched.skill}
        />
        <SelectCustom
          handleChange={(value, option) => {
            setFieldValue("certification", value);
          }}
          mode={"tags"}
          labelContent={"Chứng chỉ"}
          error={errors.certification}
          touched={touched.certification}
        />
      </div>
      <div className="text-right">
        <Button
          htmlType="submit"
          variant="solid"
          className="bg-blackSecond text-white"
        >
          Xác nhận
        </Button>
      </div>
    </form>
  );
};

export default FormAddUser;
