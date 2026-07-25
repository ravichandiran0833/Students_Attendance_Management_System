import React, { useEffect } from "react";
import {} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStudentLoginInfo,
  clearStudentViewAttendanceError,
  clearStudentViewAttendanceInfo,
  studentViewAttendance,
} from "../../redux/slices/studentSlice";
import { toast } from "react-toastify";
import Loading from "../Loading";
import useDocumentTitle from "../../hooks/useDocumnetTitle";
const StudentViewAttendance = () => {
  useDocumentTitle("Student View Attendance")
  const { studentViewAttendanceInfo, loading, error, studentLoginInfo } =
    useSelector((state) => state.student);

  const studentSlice = useSelector((state) => state.student);
  console.log("studentSlice :", studentSlice);

  const studentData = studentLoginInfo?.studentData || {};

  const studentAttendanceData =
    studentViewAttendanceInfo?.studentAttendanceData || [];

  const { student_id } = studentData;

  const dispatch = useDispatch();


  useEffect(() => {
    if (student_id) {
      dispatch(studentViewAttendance(student_id));
    }

    return () => {
      dispatch(clearStudentViewAttendanceInfo());
      dispatch(clearStudentLoginInfo());
    };
  }, [dispatch, student_id]);

  useEffect(() => {
    if (error) {
      toast.error(error.studentViewAttendance?.message, {
        autoClose: 2000,
      });
      dispatch(clearStudentViewAttendanceError());
    }
  }, [error, dispatch]);

  const totalPresent = studentAttendanceData.filter(
    (student) => student.status === "Present",
  ).length;

  const totalAbsent = studentAttendanceData.filter(
    (student) => student.status === "Absent",
  ).length;

  const totalDays = studentAttendanceData.length;

  const attendancePrecentage =
    totalPresent > 0 ? ((totalPresent / totalDays) * 100).toFixed(2) : 0;
  console.log("totalPresent :", totalPresent);

  return (
    <>
      <div className="relative w-full min-h-screen">
        {loading.studentViewAttendance && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
            <Loading />
          </div>
        )}
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                Student Attendance Report
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <span className="font-semibold">Name :</span>
                  <span className="ml-2">{studentData.student_name}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <span className="font-semibold">Register No :</span>
                  <span className="ml-2">{studentData.register_no}</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Reg No</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {studentAttendanceData.map((student, index) => (
                    <tr className="border-b hover:bg-gray-50" key={index}>
                      <td className="px-4 py-3">
                        {" "}
                        {new Date(student.attendance_date).toLocaleDateString(
                          "en-IN",
                        )}
                      </td>
                      <td className="px-4 py-3">{student.register_no}</td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-4 py-3">Total Present</td>
                    <td className="px-4 py-3">{totalPresent}</td>
                    <td></td>
                  </tr>

                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-4 py-3">Total Absent</td>
                    <td className="px-4 py-3">{totalAbsent}</td>
                    <td></td>
                  </tr>

                  <tr className="bg-blue-50 font-bold">
                    <td className="px-4 py-3">Percentage</td>
                    <td className="px-4 py-3 text-blue-600">
                      {attendancePrecentage}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentViewAttendance;
