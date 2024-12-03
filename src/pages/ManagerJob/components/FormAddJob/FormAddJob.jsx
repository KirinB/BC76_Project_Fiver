import React, { useContext, useEffect, useState } from "react";
import { InputCustom } from "../../../../components/input/inputCustom/InputCustom";
import { useFormik } from "formik";
import { congViecService } from "../../../../services/congViec.service";
import { Button, Input } from "antd";
import { NotificationContext } from "../../../../App";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import SelectCustom from "../../../../components/selectCustom/SelectCustom";
import { loaiCongViecService } from "../../../../services/loaiCongViec.service";
const FormAddJob = ({ handleCloseModal, layDanhSachCongViec, dataUser }) => {
  const { handleNotification } = useContext(NotificationContext);
  const [image, setImage] = useState(null);
  const [listDetailJobs, setListDetailJobs] = useState([]);
  let optionsListDetailJob = [];
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
    resetForm,
  } = useFormik({
    initialValues: {
      id: 0,
      tenCongViec: "",
      danhGia: 0,
      giaTien: 0,
      nguoiTao: 0,
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: "",
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
          resetForm();
        })
        .catch((err) => {
          handleNotification("error", err.response.data.content);
        });
    },
    validationSchema: Yup.object({
      tenCongViec: Yup.string().required("Vui lòng không bỏ trống !"),
      danhGia: Yup.string().required("Vui lòng không bỏ trống !"),
      giaTien: Yup.number().min(1, "Vui lòng không bỏ trống !"),
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

  useEffect(() => {
    loaiCongViecService
      .getListChiTietLoaiCongViec()
      .then((res) => {
        console.log(res.data.content);

        const options = res.data.content.map((item) => ({
          value: item.id,
          label: item.tenLoaiCongViec,
        }));
        setListDetailJobs(options);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
      </div>

      {/* đang chờ xử lí */}

      {/* <InputCustom
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
      /> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SelectCustom
          handleChange={(value) => {
            setFieldValue("maChiTietLoaiCongViec", value);
          }}
          labelContent={"Detail Code"}
          options={listDetailJobs}
          touched={touched.maChiTietLoaiCongViec}
          error={errors.maChiTietLoaiCongViec}
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
      </div>
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
      {image && values.hinhAnh && (
        <div>
          <img
            src={values.hinhAnh}
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
