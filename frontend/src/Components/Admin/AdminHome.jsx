import React from "react";

export const AdminHome = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center py-10  bg-gray-400">
        <h1 className="text-md  lg:text-xl text-white font-bold bg-whitesmoke shadow-[0_0_10px_white] border border-none outline-none w-full text-center py-3">Admin Dashboard</h1>
        <div className="w-full flex flex-wrap gap-5 justify-evenly my-10 lg:my-30 ">
          <div className="bg-yellow-400 w-50 py-5 lg:w-70 lg:py-20  text-center text-white text-md lg:text-xl font-bold rounded shadow-[0_0_10px_whitesmoke] border border-gray-300  admin-box1-animation">
            <p className="">Total Teachers</p>
            <span>20</span>
          </div>
          <div className="bg-blue-400 w-50 py-5 lg:w-70 lg:py-20 text-center text-white lg:text-xl font-bold shadow-[0_0_10px_whitesmoke] border border-gray-300 rounded admin-box2-animation">
            <p>Total Department</p>
            <span>20</span>
          </div>
          <div className="bg-green-400 w-50 py-5 lg:w-70 lg:py-20 text-center  text-white lg:text-xl font-bold shadow-[0_0_10px_whitesmoke] border border-gray-300 rounded admin-box3-animation">
            <p>Total Students</p>
            <span>20</span>
          </div>
        </div>
      </div>
    </>
  );
};
