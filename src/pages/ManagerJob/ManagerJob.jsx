import React, { useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { congViecService } from "../../services/congViec.service";
import { Button, Modal, Table } from "antd";
import { StarFilled } from "@ant-design/icons";
import FormAddJob from "./components/FormAddJob/FormAddJob";
const ManagerJob = () => {
  const [listJob, setListJob] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record) => {
        return <img src={text} alt="" className="w-20 h-20" />;
      },
    },
    {
      title: "Job's Name",
      dataIndex: "tenCongViec",
      key: "tenCongViec",
    },
    {
      title: "Cost",
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
      title: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="space-x-3">
            <Button danger>Sửa</Button>
            <Button className="border-yellow-500 text-yellow-500">Xóa</Button>
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
        title="Add Job"
        open={isModalOpen}
      >
        {" "}
        <FormAddJob
          handleCloseModal={() => {
            setIsModalOpen(false);
          }}
          layDanhSachCongViec={layDanhSachCongViec}
        />
      </Modal>
    </div>
  );
};

export default ManagerJob;
