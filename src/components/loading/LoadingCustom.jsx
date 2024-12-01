import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

const LoadingCustom = () => {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}></Spin>
  );
};

export default LoadingCustom;
