import React, { useContext, useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { congViecService } from "../../services/congViec.service";
import { Button, Modal, Table, Popconfirm } from "antd";
import { StarFilled } from "@ant-design/icons";
import FormAddJob from "./components/FormAddJob/FormAddJob";
import { NotificationContext } from "../../App";
import FormPutJob from "./components/FormPutJob/FormPutJob";
const ManagerJob = () => {
  const { handleNotification } = useContext(NotificationContext);
  const [listJob, setListJob] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("userInfo"));
  const [initialValues, setInitialValues] = useState({
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
  });
  const layDanhSachCongViec = () => {
    congViecService
      .getDanhSachCongViec()
      .then((res) => {
        console.log(res);
        const jobWithKey = res.data.content.map((job) => ({
          ...job,
          key: job.id,
        }));
        setListJob(jobWithKey);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "tenCongViec",
      key: "tenCongViec",
      width: 300,
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",

      render: (text, record) => {
        return <img src={text} alt="" className="w-20 h-20" />;
      },
    },
    {
      title: "Description",
      dataIndex: "moTaNgan",
      key: "moTaNgan",
      width: 500,
    },
    {
      title: "Price",
      dataIndex: "giaTien",
      key: "giaTien",
    },
    {
      title: "Rate",
      dataIndex: "saoCongViec",
      key: "saoCongViec",
      render: (text, record, index) => {
        return (
          <div className="space-x-2">
            <p className="inline">{text}</p>
            <StarFilled style={{ color: "gold" }} />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="space-x-3">
            <Popconfirm
              title="Xóa công việc"
              description="Bạn có chắc muốn xóa công việc này không ?"
              onConfirm={() => {
                congViecService
                  .deleteCongViec(record.id, dataUser.token)
                  .then((res) => {
                    console.log(res);
                    layDanhSachCongViec();
                    handleNotification("success", "Xóa công việc thành công");
                  })
                  .catch((err) => {
                    layDanhSachCongViec();
                    handleNotification("error", err.response.data.content);
                  });
              }}
            >
              <Button danger>Xóa</Button>
            </Popconfirm>

            <Button
              onClick={() => {
                setIsModalOpen2(true);

                congViecService
                  .getCongViec(record.id)
                  .then((res) => {
                    console.log(res);
                    setInitialValues(res.data.content);
                    console.log(initialValues);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="border-yellow-500 text-yellow-500"
            >
              Sửa
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    layDanhSachCongViec();
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">Danh sách công việc</h1>

      <Button
        variant="solid"
        className="bg-green-600 text-white"
        size="large"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Thêm công việc
      </Button>
      <Table dataSource={listJob} columns={columns} />
      <Modal
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        title="Add Job"
        open={isModalOpen}
      >
        {" "}
        <FormAddJob
          handleCloseModal={() => {
            setIsModalOpen(false);
          }}
          layDanhSachCongViec={layDanhSachCongViec}
          dataUser={dataUser}
        />
      </Modal>
      <Modal
        onCancel={() => {
          setIsModalOpen2(false);
        }}
        footer={null}
        title="Chỉnh sửa công việc"
        open={isModalOpen2}
      >
        <FormPutJob
          handleCloseModal={() => {
            setIsModalOpen(false);
          }}
          initialValues={initialValues}
          layDanhSachCongViec={layDanhSachCongViec}
          dataUser={dataUser}
        />
      </Modal>
    </div>
  );
};

export default ManagerJob;
