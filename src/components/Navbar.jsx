<<<<<<< HEAD
import React, { useState } from "react";
import Hamburger from "hamburger-react";
=======
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
>>>>>>> a07ce9d9a27b10f4ff775cbebbe28af5c2e312a0

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
<<<<<<< HEAD
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
=======
	const navigate = useNavigate();
	const userDetails = useSelector((state) => state.auth.userData);

	return (
		<>
			<div>
				<nav className='bg-gray-800'>
					<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
						<div className='relative flex items-center justify-between h-16'>
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
								<div
									className='flex-shrink-0 flex items-center cursor-pointer hover:bg-gray-700 px-2 py-2 rounded-full text-lg font-medium'
									onClick={() => {
										navigate('/');
									}}
								>
									<img
										className='hidden md:block h-10 w-auto'
										src='/favicon.png'
										alt=''
									/>
								</div>
							</div>
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start text-gray-500'>
								<h1 className='text-4xl font-serif font-medium '>
									Mess Manager
								</h1>
							</div>
							<div className='hidden sm:block sm:ml-6'>
								{Object.keys(userDetails).length !== 0 ? (
									<div className='flex space-x-4'>
										<div
											className='flex-shrink-0 flex items-center cursor-pointer hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium'
											onClick={() => {
												navigate('/user');
											}}
										>
											<img
												className='hidden lg:block h-10 w-auto'
												src={userDetails?.userAvatar}
												alt=''
											/>
										</div>
										<p className='hover:bg-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-lg text-red-600 font-medium cursor-pointer'>
											Log out
										</p>
									</div>
								) : (
									<div
										className='flex space-x-4'
										onClick={() => {
											navigate('/login');
										}}
									>
										<p className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium cursor-pointer'>
											Login
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
>>>>>>> a07ce9d9a27b10f4ff775cbebbe28af5c2e312a0
}

export default Navbar;
