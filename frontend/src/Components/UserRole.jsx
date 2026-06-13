import React from "react";
import { Link } from "react-router-dom";
export const UserRole = () => {
  return (
    <div className="user-role-container text-white h-screen w-screen flex flex-col  items-center">
      <h1 className="text-xl w-full m-10  text-center md:text-2xl lg:text-3xl font-bold md:m-20  lg:m-20">
        Students Attendance Management System
      </h1>
      <div className="flex flex-col items-center gap-10">
        <h3 className="text-xl md:text-2xl lg:text-2xl font-bold">Select Your Role</h3>
        <div className="text-md  flex flex-col gap-4 md:flex md:flex-row md:gap-5 text-black lg:flex lg:text-xl">
          <div
            className="role-div px-4 py-2 text-center bg-white md:px-6 md:py-3 lg:px-6 lg:py-3 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.25)]  hover:-translate-y-2  delay-200 ease-in-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
                  transition-all duration-30 "
          >
            <Link to="/admin-login">Admin</Link>
          </div>
          <div
            className="role-div px-4 py-2 text-center bg-white md:px-6 md:py-3 lg:px-6 lg:py-3 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] hover:-translate-y-2  delay-200 ease-in-out
                  hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
                  transition-all duration-300"
          >
            <Link to="/Teacher-login">Teacher</Link>
          </div>
          <div
            className="role-div px-4 py-2 text-center bg-white md:px-6 md:py-3 lg:px-6 lg:py-3 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] hover:-translate-y-2  delay-200 ease-in-out
                  hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
                  transition-all duration-300"
          >
            <Link to="/Student-login">Student</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
