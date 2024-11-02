import React from "react";
import { Link } from "react-router-dom";
import "./CategoryHomePage.scss";
const CategoryHomePage = ({ icon, title }) => {
  return (
    <div className="p-[6px]">
      <Link
        className="inline-flex flex-col gap-5 h-[129px] w-[129px] bg-white border border-white rounded-2xl py-4 px-3 relative category_homepage"
        to={""}
      >
        {icon}
        <p className="text-sm font-semibold text-[#222325]">{title}</p>
      </Link>
    </div>
  );
};

export default CategoryHomePage;
