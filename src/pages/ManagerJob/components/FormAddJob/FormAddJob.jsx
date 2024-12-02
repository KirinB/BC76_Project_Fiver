import React, { useContext, useEffect, useState } from "react";
import { InputCustom } from "../../../../components/input/inputCustom/InputCustom";
import { useFormik } from "formik";
import { congViecService } from "../../../../services/congViec.service";
import { Button, Input } from "antd";
import { NotificationContext } from "../../../../App";
import { useSelector } from "react-redux";
import * as Yup from "yup";
const FormAddJob = ({ handleCloseModal, layDanhSachCongViec, dataUser }) => {
  const { handleNotification } = useContext(NotificationContext);
  const [image, setImage] = useState(null);
  const handleChangeImage = (event) => {
    const url = event.target.value.trim();
    setImage(url);
    setFieldValue("hinhAnh", url);
  };
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: 0,
      tenCongViec: "",
      danhGia: 0,
      giaTien: 0,
      nguoiTao: 0,
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: 0,
      moTaNgan: "",
      saoCongViec: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      congViecService
        .postCongViec(values, dataUser.token)
        .then((res) => {
          console.log(res);
          layDanhSachCongViec();
          handleCloseModal();
          handleNotification("success", "Thêm công việc thành công");
        })
        .catch((err) => {
          handleNotification("error", err.response.data.content);
        });
    },
    validationSchema: Yup.object({
      tenCongViec: Yup.string().required("Vui lòng không bỏ trống !"),
      danhGia: Yup.string().required("Vui lòng không bỏ trống !"),
      giaTien: Yup.string().required("Vui lòng không bỏ trống !"),
      moTa: Yup.string().required("Vui lòng không bỏ trống !"),
      moTaNgan: Yup.string().required("Vui lòng không bỏ trống !"),
      maChiTietLoaiCongViec: Yup.string().required("Vui lòng không bỏ trống !"),
      saoCongViec: Yup.number()
        .min(0, "Vui lòng nhập từ 0-5")
        .max(5, "Vui lòng nhập từ 0-5")
        .required("Vui lòng không bỏ trống !"),
      hinhAnh: Yup.string().required("Vui lòng không bỏ trống !"),
    }),
  });

  // tạo đối tượng để đọc files

  return (
    <form action="" onSubmit={handleSubmit} className="space-y-3">
      <InputCustom
        id="tenCongViec"
        name="tenCongViec"
        value={values.tenCongViec}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.tenCongViec}
        touched={touched.tenCongViec}
        labelContent={"Name's Job"}
        placeholder={"Vui lòng nhập tên công việc"}
      />
      <InputCustom
        id="moTa"
        name="moTa"
        value={values.moTa}
        handleBlur={handleBlur}
        handleChange={handleChange}
        error={errors.moTa}
        touched={touched.moTa}
        labelContent={"Discription"}
        placeholder={"Vui lòng nhập mô tả"}
      />
      <InputCustom
        id="moTaNgan"
        name="moTaNgan"
        value={values.moTaNgan}
        handleBlur={handleBlur}
        handleChange={handleChange}
        error={errors.moTaNgan}
        touched={touched.moTaNgan}
        labelContent={"Short Discription"}
        placeholder={"Vui lòng nhập mô tả ngắn"}
      />
      <InputCustom
        id="giaTien"
        name="giaTien"
        value={values.giaTien}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.giaTien}
        touched={touched.giaTien}
        type="number"
        labelContent={"Price"}
        placeholder={"Vui lòng nhập giá tiền"}
      />
      <InputCustom
        id="danhGia"
        name="danhGia"
        value={values.danhGia}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.danhGia}
        touched={touched.danhGia}
        type="number"
        labelContent={"Rate"}
        placeholder={"Vui lòng nhập đánh giá"}
      />

      {/* đang chờ xử lí */}

      <InputCustom
        id="maChiTietLoaiCongViec"
        name="maChiTietLoaiCongViec"
        value={values.maChiTietLoaiCongViec}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.maChiTietLoaiCongViec}
        touched={touched.maChiTietLoaiCongViec}
        type="number"
        labelContent={"Detail Code"}
        placeholder={"Vui lòng nhập detail code"}
      />
      <InputCustom
        id="saoCongViec"
        name="saoCongViec"
        type="number"
        value={values.saoCongViec}
        handleBlur={handleBlur}
        handleChange={handleChange}
        error={errors.saoCongViec}
        touched={touched.saoCongViec}
        labelContent={"Star Ratting"}
        placeholder={"Vui lòng nhập sao công việc"}
      />
      <InputCustom
        id="hinhAnh"
        name="hinhAnh"
        value={values.hinhAnh}
        handleBlur={handleBlur}
        handleChange={handleChangeImage}
        error={errors.hinhAnh}
        touched={touched.hinhAnh}
        labelContent={"Image"}
        placeholder={"Vui lòng nhập url hình ảnh"}
      />
      {image && (
        <div>
          <img
            src={image}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "5px",
            }}
          />
        </div>
      )}

      <div className="text-end">
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

export default FormAddJob;
