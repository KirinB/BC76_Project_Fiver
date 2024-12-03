import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { binhLuanService } from "../../services/binhLuan.service";
import { StarFilled } from "@ant-design/icons";
const ManagerComment = () => {
  const [listComment, setListComment] = useState([]);
  const layDanhSachComment = () => {
    binhLuanService
      .getBinhLuan()
      .then((res) => {
        console.log(res);
        const commentWithKey = res.data.content.map((comment) => ({
          ...comment,
          key: comment.id,
        }));
        setListComment(commentWithKey);
      })
      .catch((err) => {
        err;
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Job Code",
      dataIndex: "maCongViec",
      key: "maCongViec",
    },
    {
      title: "UserID",
      dataIndex: "maNguoiBinhLuan",
      key: "maNguoiBinhLuan",
    },
    {
      title: "Date",
      dataIndex: "ngayBinhLuan",
      key: "ngayBinhLuan",
    },
    {
      title: "Content",
      dataIndex: "noiDung",
      key: "noiDung",
    },
    {
      title: "Rate",
      dataIndex: "saoBinhLuan",
      key: "saoBinhLuan",
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
      render: (text, record, index) => {
        return (
          <div className="space-x-3">
            <Button className="text-yellow-500 border-yellow-500">Sửa</Button>
            <Button danger>Xóa</Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    layDanhSachComment();
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Danh sách bình luận</h1>
      <Button className="bg-green-600 text-white" size="large" variant="solid">
        Thêm Comment
      </Button>
      <Table scroll={{ x: 1240 }} dataSource={listComment} columns={columns} />;
    </div>
  );
};

export default ManagerComment;
