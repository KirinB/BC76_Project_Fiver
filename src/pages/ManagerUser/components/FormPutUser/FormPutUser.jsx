import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import { InputCustom } from "../../../../components/input/inputCustom/InputCustom";
import { Button, DatePicker } from "antd";
import SelectCustom from "../../../../components/selectCustom/SelectCustom";
import { NotificationContext } from "../../../../App";
import dayjs from "dayjs";
import { skillService } from "../../../../services/skill.service";
const FormPutUser = ({
  handleCloseModal,
  initialValues,
  layDanhSachNguoiDung,
}) => {
  const { handleNotification } = useContext(NotificationContext);
  const [listSkill, setListSkill] = useState([]);
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      nguoiDungService
        .suaNguoiDung(values.id, values)
        .then((res) => {
          handleCloseModal();
          layDanhSachNguoiDung();
          handleNotification("success", "Sửa người dùng thành công");
        })
        .catch((err) => {
          handleNotification("error", err.response.data.content);
        });
    },
  });
  const roleOptions = [
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" },
  ];
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
        readOnly={true}
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
        readOnly={true}
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
          value={values.role}
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
            value={
              values.birthday ? dayjs(values.birthday, "DD-MM-YYYY") : null
            }
            onChange={(date, dateString) => {
              setFieldValue("birthday", dateString);
            }}
            format="DD-MM-YYYY"
            className="w-full"
          />
        </div>
        <SelectCustom
          value={values.gender ? "Nam" : "Nữ"}
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
          value={values.skill}
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
          value={values.certification}
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

export default FormPutUser;
