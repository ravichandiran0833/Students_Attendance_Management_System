import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { getDashboard } from "../../redux/slices/adminSlice";
export const AdminDashBoard = () => {
  const location = useLocation();

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getDashboard())
  },[])


  return (
    <>
      <div className="w-screen h-screen flex ">
        <div
          className={`admin-dashboard-div1 bg-gray-500  lg:w-64 
            ${
              location.pathname === "/admin-dashboard/add-teacher" ||
              location.pathname === "/admin-dashboard/add-department" ||
              location.pathname === "/admin-dashboard/view-teachers"
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
              <Link to="/admin-dashboard/add-teacher">Add Teacher</Link>
            </li>
            <hr className="border w-full border-gray-600" />
            <li className="w-full text-center py-1  hover:bg-gray-400 px-2">
              <Link to="/admin-dashboard/add-department">Add Department</Link>
            </li>
            <hr className="border w-full border-gray-600" />
            <li className="w-full text-center py-1  hover:bg-gray-400">
              <Link to="view-teachers">View Teachers</Link>
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
