import React, { useState } from "react";
import Hamburger from "hamburger-react";

import {
  AiOutlineHome,
  AiOutlineNotification,
  AiOutlineMessage,
  AiOutlineSearch,
  AiFillPlusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
const iconstyle = "text-2xl text-white";
function Navbar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="navbar fixed top-0 left-0 py-2 bg-black backdrop-blur-md bg-opacity-30 w-full  flex flex-row items-center justify-evenly md:gap-4 ">
        <img
          src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png"
          alt="logo"
          className="h-10 w-10"
        />
        <div className="md:hidden block">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color="white"
            size={30}
          />
        </div>

        <div
          className={`navbar  md:block md:relative md:top-0  absolute top-20 w-[90vw]  items-center ${
            !isOpen ? "hidden" : "block"
          }`}
        >
          <ul className="flex md:flex-row flex-col  bg-slate-700   justify-evenly items-center py-10 md:py-4 rounded-xl gap-10  ">
            <li>
              <AiOutlineHome className={iconstyle} />
            </li>
            <li>
              <AiOutlineNotification className={iconstyle} />
            </li>
            <li>
              <AiOutlineMessage className={iconstyle} />
            </li>
            <li>
              <AiOutlinePlusSquare className={iconstyle} />
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2   ">
          <input
            type="text"
            placeholder="Search"
            className="bg-slate-700 p-2 rounded-lg w-[20vw]  focus:bg-slate-800 focus:w-[40vw]  transition-all duration-500 ease-in-out"
          />
          <div className="bg-slate-700 rounded-full text-3xl  p-1 cursor-pointer ">
            <AiOutlineSearch />
          </div>
        </div>

        <div className="h-10 w-10 rounded-full m-2 object-cover shrink-0">
          <img
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt="profile"
            className=""
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
