import { useEffect } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import { RiPencilLine, RiLogoutBoxLine } from "react-icons/ri";
import { userLogin } from "../api/auth";

function DashBoard() {
  async function getUser() {
    const user = await userLogin();
    console.log(user);
    return user;
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Navbar />
      <div className="dashboard  p-4 mt-[12vh]  bg-gray-900 ">
        <h1 className="title text-center text-3xl my-4 ">Dashboard</h1>

        <div className="dashboard-container m-auto bg-slate-600 space-y-4 flex flex-col  justify-center items-center rounded-xl p-4 ">
          <span className="self-end bg-slate-700 p-2 rounded-md px-4 flex space-x-4">
            <h1>Logouts</h1>
            <RiLogoutBoxLine className=" text-center m-auto" />
          </span>

          <div className="  flex flex-col item-center gap-4">
            <img
              src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="user_img"
              className=" rounded-full  object-cover p-1 ring-sky-200 ring-2  w-[15em] h-[15em] "
            />
            <button className=" bg-slate-700 flex justify-center items-center p-2 gap-4 rounded-full">
              <span>Update</span>
              <span>
                {" "}
                <RiPencilLine className="text-[2em] m-auto" />
              </span>
            </button>
            {/* <button className="absolute inset-0 ring-1 ring-sky-100 bg-cyan-600 backdrop-blur-md bg-opacity-20 p-2 w-[3em] h-[3em] rounded-full text-white font-semibold ">
              <RiPencilLine className="text-[2em] m-auto" />
            </button> */}
          </div>

          <h1 className="username text-3xl font-extrabold  ">Sourav Bhunia</h1>
          <div className="flex justify-center items-center space-x-3">
            <h1> sourav@gmail.com</h1>
            <RiPencilLine className="text cursor-pointer" />
          </div>
          <h2 className="bg-cyan-600 p-4  rounded-md text-xl font-semibold cursor-pointer">
            Half Dozen
          </h2>
          <h2>
            Member Since : <span>12 May , 2023</span>
          </h2>
          <div className=" detail flex  p-3 m-2  gap-4 flex-wrap  justify-center items-center">
            <div className="border-2 border-sky-200 p-2  rounded-md bg-cyan-600 ">
              <h2 className="text-xl font-bold">Monthly Payment</h2>
              <h1>₹ 1200</h1>
            </div>
            <div className="border-2 border-sky-200 p-2 rounded-md bg-cyan-600 ">
              <h2 className="text-xl font-bold">Due Payment</h2>
              <h1>₹ 200</h1>
            </div>
            <div className="border-2 border-sky-200 p-2 rounded-md bg-cyan-600 ">
              <h2 className="text-xl font-bold">Remaining Days</h2>
              <h1>12 Days</h1>
            </div>
          </div>
          <div className=" p-2 rounded-md m-auto flex space-x-2 bg-slate-700 cursor-pointer px-4">
            <span>Leave Messs</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
