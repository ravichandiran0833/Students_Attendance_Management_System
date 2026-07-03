import React from "react";
import { useSelector } from "react-redux";

import { Link, Outlet, useLocation } from "react-router-dom";
export const TeacherDashboard = () => {
  const location = useLocation()
  const teacherSlice = useSelector((state) => state.teacher);
  console.log("teacherSlice :", teacherSlice);
  return (
    <>
      <div className="min-h-screen w-full h-auto flex">
        <div className={`w-auto bg-gray-600 text-xs md:w-64 md:text-lg
        
         ${
          location.pathname === "/teacher-dashboard/all-departments/add-student" ||
          location.pathname.startsWith("/teacher-dashboard/add-student") ||
          location.pathname === "/teacher-dashboard/all-departments/view-students" ||
          location.pathname.startsWith("/teacher-dashboard/view-students/") ||
          location.pathname.startsWith("/teacher-dashboard/edit-student/") ||
          location.pathname === "/teacher-dashboard/all-departments/attendance-page" ||
          location.pathname.startsWith("/teacher-dashboard/attendance-page/") ||
          location.pathname === "/teacher-dashboard/all-departments/edit-attendance" ||
          location.pathname.startsWith("/teacher-dashboard/edit-attendance/")
          
          ? "hidden md:block" : "block"
        }

        `
        }>

          <ul className="pt-20 flex flex-col  text-white w-full">
            <hr className="border w-full border-gray-400" />
            <li className="px-2 hover:bg-gray-500 py-1">
              <Link to="">Home</Link>
            </li>
            <hr className="border w-full border-gray-400" />
            <li className="px-2 hover:bg-gray-500 py-1">
              <Link to="/teacher-dashboard/all-departments/add-student">Add Student</Link>
            </li>
            <hr className="border w-full border-gray-400" />
            <li className="px-2 hover:bg-gray-500 py-1">
              <Link to="/teacher-dashboard/all-departments/view-students">
                View Students
              </Link>
            </li>
            <hr className="border w-full border-gray-400" />
            <li className="px-2 hover:bg-gray-500 py-1">
              <Link to="/teacher-dashboard/all-departments/attendance-page">
                Attendance
              </Link>
            </li>
            <hr className="border w-full border-gray-400" />
            <li className="px-2 hover:bg-gray-500 py-1">
              <Link to="/teacher-dashboard/all-departments/edit-attendance">
                Edit Attendance
              </Link>
            </li>
            <hr className="border w-full border-gray-400" />
          </ul>
        </div>

        <div className="flex-1 bg-amber-200">
          <Outlet />
        </div>
      </div>
    </>
  );
};
