import React, { useContext, useEffect, useState } from "react";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { Avatar, Button, Modal, Popconfirm, Table, Tag } from "antd";
import { NotificationContext } from "../../App";
import FormAddUser from "./components/FormAddUser/FormAddUser";

const ManagerUser = () => {
  const { handleNotification } = useContext(NotificationContext);
  const [listUser, setListUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const layDanhSachNguoiDung = () => {
    nguoiDungService
      .layDanhSachNguoiDung()
      .then((res) => {
        // console.log(res);
        const usersWithKeys = res.data.content.map((user) => ({
          ...user,
          key: user.id,
        }));
        setListUser(usersWithKeys);
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
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => {
        return text ? (
          <img src={text} className="w-10 h-10" />
        ) : (
          <Avatar size={40} key={record.id}>
            <span className="uppercase">{record.name[0]}</span>
          </Avatar>
        );
      },
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        return text == "ADMIN" ? (
          <Tag color="magenta">{text}</Tag>
        ) : text == "USER" ? (
          <Tag color="cyan">{text}</Tag>
        ) : text == "" ? (
          <Tag color="purple">CHƯA XÁC ĐỊNH</Tag>
        ) : (
          <Tag color="gold">{text}</Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="space-x-3">
            <Popconfirm
              title="Thực hiện xóa người dùng"
              description="Bạn có chắc muốn xóa người dùng không?"
              onConfirm={() => {
                nguoiDungService
                  .xoaNguoiDung(record.id)
                  .then((res) => {
                    // console.log(res);
                    layDanhSachNguoiDung();
                    handleNotification("success", res.data.message);
                  })
                  .catch((err) => {
                    layDanhSachNguoiDung();
                    handleNotification("error", err.response.data.content);
                  });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Button className="border-yellow-500 text-yellow-500">Sửa</Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    layDanhSachNguoiDung();
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">
        Danh sách người dùng trong hệ thống
      </h1>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
        variant="solid"
        className="bg-green-600 text-white"
        size="large"
      >
        Thêm người dùng
      </Button>
      <Table scroll={{ x: 900 }} dataSource={listUser} columns={columns} />
      <Modal
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        title="Thêm người dùng"
        open={isModalOpen}
      >
        <FormAddUser
          handleCloseModal={() => {
            setIsModalOpen(false);
          }}
          layDanhSachNguoiDung={layDanhSachNguoiDung}
        />
      </Modal>
    </div>
  );
};

export default ManagerUser;
