import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../../../components/input/inputCustom/InputCustom";
import SelectCustom from "../../../../components/selectCustom/SelectCustom";
import { Button, DatePicker } from "antd";
import { useFormik } from "formik";
import { skillService } from "../../../../services/skill.service";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import { NotificationContext } from "../../../../App";

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
      gender: true,
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
          console.log(err);
        });
    },
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
        />
        <SelectCustom
          handleChange={(value, option) => {
            setFieldValue("certification", value);
          }}
          mode={"tags"}
          labelContent={"Chứng chỉ"}
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
