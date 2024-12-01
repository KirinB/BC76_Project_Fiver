import React from "react";
import HeaderTemplate from "./components/HeaderTemplate";
import { Outlet } from "react-router-dom";
import FooterTemplate from "./components/FooterTemplate";

const HomeTemplate = () => {
  return (
    <>
      <HeaderTemplate />
      <div className="pb-[75px]"></div>
      <Outlet />
      <FooterTemplate />
    </>
  );
};

export default HomeTemplate;
