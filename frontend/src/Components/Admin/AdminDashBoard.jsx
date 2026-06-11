import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
export const AdminDashBoard = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-screen h-screen flex ">
        <div
          className={`admin-dashboard-div1 bg-gray-500  lg:w-64 
            ${
              location.pathname === "/admin_dashboard/add_teacher" ||
              location.pathname === "/admin_dashboard/add_department" ||
              location.pathname === "/admin_dashboard/view_teachers"
                ? "hidden md:block"
                : "block"
            }
            `}
        >
          <ul className="flex flex-col  items-center pt-25 text-white text-xs lg:text-lg ">
            <hr className="border w-full border-gray-600" />
            <li className="w-full text-center py-1  hover:bg-gray-400">
              <Link to="" className="">
                Home
              </Link>
            </li>
            <hr className="border w-full border-gray-600" />
            <li className="w-full text-center py-1  hover:bg-gray-400">
              <Link to="/admin_dashboard/add_teacher">Add Teacher</Link>
            </li>
            <hr className="border w-full border-gray-600" />
            <li className="w-full text-center py-1  hover:bg-gray-400 px-2">
              <Link to="/admin_dashboard/add_department">Add Department</Link>
            </li>
            <hr className="border w-full border-gray-600" />
            <li className="w-full text-center py-1  hover:bg-gray-400">
              <Link to="view_teachers">View Teachers</Link>
            </li>
            <hr className="border w-full border-gray-600" />
            <li className="w-full text-center py-1  hover:bg-gray-400">
              <Link>View Department</Link>
            </li>
            <hr className="border w-full border-gray-600" />
          </ul>
        </div>
        <div className="admin-dashboard-div2 flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};
