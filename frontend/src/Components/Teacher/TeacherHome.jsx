import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDashboardDetailsError,
  clearDashboardDetailsInfo,
  dashboardDetails,
} from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";
import Loading from "../Loading";
import useDocumentTitle from "../../hooks/useDocumnetTitle";

const TeacherHome = () => {
  useDocumentTitle("Teacher Home")
  const dispatch = useDispatch();

  const { dashboardDetailsInfo, loading, error } = useSelector(
    (state) => state.teacher,
  );

  const dashboardData = dashboardDetailsInfo?.dashboardData || [];

  useEffect(() => {
    dispatch(dashboardDetails());

    return () => {
      dispatch(clearDashboardDetailsInfo());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.dashboardDetails?.message, {
        autoClose: 2000,
      });
      dispatch(clearDashboardDetailsError());
    }
  }, [dispatch, error]);

  return (
    <>
      <div className="relative w-full min-h-screen">
        {loading.dashboardDetails && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
            <Loading />
          </div>
        )}

        <div className="w-full min-h-screen bg-[#050816]">
          <h1 className="text-center dashboard-title text-xl md:text-4xl">
            Teacher Dashboard
          </h1>

          <div className="flex flex-wrap justify-evenly md:justify-start md:ml-23 py-15 md:py-30 gap-8">
            {dashboardData.map((d, index) => (
              <div
                className="border dashboard-card w-[200px] px-4 md:w-[300px] md:h-[300px] md:p-5"
                key={index}
              >
                <p className="text-center department-title md:pb-2">
                  {d.department_name.toUpperCase()}
                </p>
                <p className="text-white flex justify-around ">
                  UG I{" "}
                  <span className="font-bold text-purple-500">{d.ug1}</span>
                </p>
                <p className="text-white flex justify-around ">
                  UG II{" "}
                  <span className="font-bold text-purple-500">{d.ug2}</span>
                </p>
                <p className="text-white flex justify-around ">
                  UG III{" "}
                  <span className="font-bold text-purple-500">{d.ug3}</span>
                </p>
                <p className="text-white flex justify-around ">
                  PG I{" "}
                  <span className="font-bold text-purple-500">{d.pg1}</span>
                </p>
                <p className="text-white flex justify-around ">
                  PG II{" "}
                  <span className="font-bold text-purple-500">{d.pg2}</span>
                </p>

                <p className="total text-center">Total Students : {d.total_students}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherHome;

