import * as Icon from "react-feather";
import * as React from "react";
import ButtonNav from "./ButtonNav";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const regex = /detail/;
  return (
    <div className="bg-transparent w-full h-fit flex justify-between">
      <div className="flex">
        {location.pathname !== "/" ? (
          <Link to="/">
            <ButtonNav child={<Icon.ArrowLeft size={28} color="white" />} />
          </Link>
        ) : (
          <Link to="/note">
            <ButtonNav child={<Icon.Plus size={28} color="white" />} />
          </Link>
        )}
        <div className="flex flex-col justify-center px-4">
          {location.pathname === "/note" ? (
            <p className="text-2xl font-medium text-white">Add Note</p>
          ) : location.pathname === "/profile" ? (
            <p className="text-2xl font-medium text-white">Profile</p>
          ) : regex.test(location.pathname) ? (
            <p className="text-2xl font-medium text-white">Detail</p>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="flex">
        <Link to="/profile">
          <ButtonNav child={<Icon.User size={28} color="white" />} />
        </Link>
        <Link to="/">
          <ButtonNav child={<Icon.X size={28} color="white" />} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
