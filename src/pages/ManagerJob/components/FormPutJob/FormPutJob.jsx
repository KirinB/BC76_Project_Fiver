import React, { useContext } from "react";
import InputCustom from "../../../../components/input/inputCustom/InputCustom";
import { useFormik } from "formik";
import { congViecService } from "../../../../services/congViec.service";
import { Button } from "antd";
import { NotificationContext } from "../../../../App";
import { useSelector } from "react-redux";

const FormAddJob = ({
  handleCloseModal,
  layDanhSachCongViec,
  dataUser,
  initialValues,
}) => {
  const { handleNotification } = useContext(NotificationContext);
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values);
        congViecService
          .putCongViec(values.id, values, dataUser.token)
          .then((res) => {
            console.log(res);
            handleNotification("success", "Sửa công việc thành công");
            layDanhSachCongViec();
            handleCloseModal();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  return (
    <form action="" onSubmit={handleSubmit} className="space-y-3">
      <InputCustom
        id="nguoiTao"
        name="nguoiTao"
        value={values.nguoiTao}
        handleBlur={handleBlur}
        handleChange={handleChange}
        error={errors.nguoiTao}
        touched={touched.nguoiTao}
        labelContent={"Người tạo"}
        placeholder={"Vui lòng nhập tên người tạo"}
      />
      <InputCustom
        id="tenCongViec"
        name="tenCongViec"
        value={values.tenCongViec}
        handleChange={handleChange}
        handleBlur={handleBlur}
        labelContent={"Tên công việc"}
        placeholder={"Vui lòng nhập tên công việc"}
      />
      <InputCustom
        id="danhGia"
        name="danhGia"
        value={values.danhGia}
        handleChange={handleChange}
        handleBlur={handleBlur}
        type="number"
        labelContent={"Đánh giá"}
        placeholder={"Vui lòng nhập đánh giá"}
      />
      <InputCustom
        id="giaTien"
        name="giaTien"
        value={values.giaTien}
        handleChange={handleChange}
        handleBlur={handleBlur}
        type="number"
        labelContent={"Giá tiền"}
        placeholder={"Vui lòng nhập giá tiền"}
      />
      {/* đang chờ xử lí */}
      <InputCustom
        labelContent={"Hình ảnh"}
        placeholder={"Vui lòng chọn hình ảnh"}
      />
      <InputCustom
        id="moTaNgan"
        name="moTaNgan"
        value={values.moTaNgan}
        handleBlur={handleBlur}
        handleChange={handleChange}
        labelContent={"Mô tả ngắn"}
        placeholder={"Vui lòng nhập mô tả ngắn"}
      />
      <InputCustom
        id="moTa"
        name="moTa"
        value={values.moTa}
        handleBlur={handleBlur}
        handleChange={handleChange}
        labelContent={"Mô tả"}
        placeholder={"Vui lòng nhập mô tả"}
      />
      <InputCustom
        id="saoCongViec"
        name="saoCongViec"
        value={values.saoCongViec}
        handleBlur={handleBlur}
        handleChange={handleChange}
        labelContent={"Sao công việc"}
        placeholder={"Vui lòng nhập sao công việc"}
      />
      <Button
        htmlType="submit"
        variant="solid"
        className="bg-blackSecond text-white"
      >
        Xác nhận
      </Button>
    </form>
  );
};

export default FormAddJob;
