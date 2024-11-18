import React from "react";
import { listCategories } from "../../../common/constant";

const CategoryNavbar = () => {
  return (
    <nav className="border-b border-gray-200">
      <div className="container py-2 border-b border-gray-300">
        <ul className="flex space-x-8 text-[#62646a] font-semibold">
          {listCategories.map((item, index) => {
            return <li key={index}>{item.title}</li>;
          })}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNavbar;
