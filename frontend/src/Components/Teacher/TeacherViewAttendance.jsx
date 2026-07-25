import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearTeacherViewAttendanceError,
  clearTeacherViewAttendanceInfo,
  teacherViewAttendance,
} from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";
import Loading from "../Loading";
import useDocumentTitle from "../../hooks/useDocumnetTitle";
const TeacherViewAttendance = () => {
  useDocumentTitle("View Attendnace")
  const { teacherViewAttendanceInfo, loading, error } = useSelector(
    (state) => state.teacher,
  );
  const { departmentId, departmentName, graduate, year } = useParams();

  const attendanceData = teacherViewAttendanceInfo?.attendanceData || [];

  const groupedAttendance = attendanceData.reduce((acc, item) => {
    const date = new Date(item.attendance_date).toLocaleDateString("en-GB");

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);

    return acc;
  }, {});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      teacherViewAttendance({ departmentId, departmentName, graduate, year }),
    );

    return () => {
      dispatch(clearTeacherViewAttendanceInfo());
    };
  }, [dispatch, departmentId, departmentName, graduate, year]);

  useEffect(() => {
    if (teacherViewAttendanceInfo?.success) {
      toast.success(teacherViewAttendanceInfo?.message, {
        autoClose: 2000,
      });
    }
    if (error) {
      toast.error(error.teacherViewAttendance?.message || error.message, {
        autoClose: 2000,
      });
      dispatch(clearTeacherViewAttendanceError());
    }
  }, [error, teacherViewAttendanceInfo, dispatch]);

  return (
    <>
      <div className="relative w-full min-h-screen">
        {loading.teacherViewAttendance && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
            <Loading />
          </div>
        )}
        <div className="flex-1 p-4 md:p-6 bg-gray-100 min-h-screen">
          <div className="bg-white shadow rounded-lg p-5 mb-6">
            <h1 className="text-md md:text-2xl font-bold text-gray-800">
              {departmentName.toLocaleUpperCase()} - {graduate} {year} Year
            </h1>
          </div>

          {Object.entries(groupedAttendance).map(([date, students]) => (
            <div key={date} className="bg-white shadow rounded-lg p-5 mb-6">
              <p className="text-gray-600 font-medium mb-4">Date : {date}</p>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="border p-3">Register No</th>
                      <th className="border p-3">Name</th>
                      <th className="border p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={`${student.register_no}-${student.attendance_date}`}
                        className="hover:bg-gray-100"
                      >
                        <td className="border p-3 text-center">
                          {student.register_no}
                        </td>

                        <td className="border p-3">{student.student_name}</td>

                        <td
                          className={`border p-3 font-semibold ${
                            student.status === "Present"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {student.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeacherViewAttendance;
