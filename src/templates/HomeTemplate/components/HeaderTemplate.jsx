import React from "react";
import Icons from "../../../components/icon";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import DropdownHeader from "../../../components/dropdown/DropdownHeader";
import {
  ButtonGhost,
  ButtonOutline,
} from "../../../components/button/ButtonCustom";
import { AiOutlineGlobal } from "react-icons/ai";
import InputSearch from "../../../components/input/inputSearch/InputSearch";

const HeaderTemplate = () => {
  const navigate = useNavigate();
  return (
    <header className="py-4 border-b border-b-gray-200">
      <div className="container">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center space-x-2 flex-1">
            <div>
              <Link to={pathDefault.homePage}>
                <Icons.logo />
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <InputSearch placeholder={"Search for any service..."} />
            </div>
          </div>
          <div>
            <div className="space-x-3 flex items-center">
              <DropdownHeader buttonContent="Fiverr Pro" />
              <DropdownHeader buttonContent="Explore" />
              <ButtonGhost
                content={"English"}
                icon={<AiOutlineGlobal />}
              ></ButtonGhost>
              <ButtonGhost content={"Become a Seller"}></ButtonGhost>
              <ButtonGhost content={"Sign in"}></ButtonGhost>
              <ButtonOutline
                onClick={() => {
                  navigate(pathDefault.signIn);
                }}
                content={"Join"}
              ></ButtonOutline>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTemplate;
