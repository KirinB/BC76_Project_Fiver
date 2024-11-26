import React from "react";
import { Link } from "react-router-dom";
import "./CategoryHomePage.scss";
const CategoryHomePage = ({ icon, title }) => {
  return (
    <div className="lg:p-[6px] flex flex-col items-center space-y-2">
      <Link
        className="inline-flex justify-center items-center lg:justify-start lg:items-start flex-col gap-5 h-24 w-24 lg:h-[129px] lg:w-[129px] bg-white border border-white rounded-2xl py-4 px-3 relative category_homepage"
        to={""}
      >
        <span>{icon}</span>
        <p className="hidden lg:block text-sm font-semibold text-[#222325]">
          {title}
        </p>
      </Link>
      <p className="w-24 lg:hidden text-xs font-semibold text-[#222325] text-center">
        {title}
      </p>
    </div>
  );
};

export default CategoryHomePage;
