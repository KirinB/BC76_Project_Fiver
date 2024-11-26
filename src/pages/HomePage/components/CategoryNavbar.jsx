import React from "react";
import { listCategories } from "../../../common/constant";

const CategoryNavbar = () => {
  return (
    <nav className="hidden lg:block border-b border-gray-200">
      <div className="container border-b border-gray-200">
        <ul className="flex justify-between space-x-8 text-[#62646a]">
          {listCategories.map((item, index) => {
            return (
              <li
                className="border-b-2 border-transparent cursor-pointer hover:border-b-green-500 py-2 transition-all duration-300 "
                key={index}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNavbar;
