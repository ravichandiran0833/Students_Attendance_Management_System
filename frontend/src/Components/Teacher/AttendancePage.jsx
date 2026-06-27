import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearDepartmenStudentsInfo,
  clearSubmitAttendanceError,
  clearSubmitAttendanceInfo,
  departmentStudents,
  submitAttendance,
} from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";

export const AttendancePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { departmentName, graduate, year } = useParams();

  const {
    departmentStudentsInfo,
    loading,
    error,
    allDepartmentsInfo,
    submitAttendanceInfo,
  } = useSelector((state) => state.teacher);

  const [attendanceStatus, setAttendanceStatus] = useState({});

  console.log("attendanceStatus : ", attendanceStatus);

  const departmentStudentsData =
    departmentStudentsInfo?.departmentStudentsData || [];

  // console.log("departmentStudentsInfo:", departmentStudentsInfo);
  // console.log("error:", error);
  // console.log("allDepartmentsInfo:", allDepartmentsInfo);
  // console.log("submitAttendanceInfo:", submitAttendanceInfo);

  useEffect(() => {
    dispatch(
      departmentStudents({
        departmentName,
        graduate,
        year,
      }),
    );

    return () => {
      dispatch(clearDepartmenStudentsInfo());
    };
  }, [departmentName, graduate, year, dispatch]);

  useEffect(() => {
    if (submitAttendanceInfo?.success) {
      toast.success(submitAttendanceInfo?.message, {
        autoClose: 2000,
      });
      dispatch(clearSubmitAttendanceInfo());
      setTimeout(() => {
        navigate("/teacher-dashboard/all-departments");
      }, 2000);
    }
    if (error) {
      toast.error(error.submitAttendance?.message, {
        autoClose: 2000,
      });
      dispatch(clearSubmitAttendanceError());
    }
  }, [error, dispatch, submitAttendanceInfo, navigate]);

  const handleAttendance = (student, status) => {
    // console.log("department :", student);
    // console.log("status :", status);
    setAttendanceStatus((prev) => ({
      ...prev,
      [student.id]: {
        studentId: student.id,
        registerNo: student.register_no,
        status: status,
        attendanceDate: new Date().toISOString().split("T")[0],
      },
    }));
  };

  const attendanceArray = Object.values(attendanceStatus);
  const totalPresent = attendanceArray.filter(
    (item) => item.status === "Present",
  ).length;
  const totalAbsent = attendanceArray.filter(
    (item) => item.status === "Absent",
  ).length;

  console.log("total P + A :", totalAbsent + totalPresent);

  const submitAttedance = (e) => {
    e.preventDefault();
    // console.log("attendanceStatus : ", attendanceStatus);
    if (totalPresent + totalAbsent !== departmentStudentsData.length) {
      return toast.warning("Please Select All Students");
    }

    dispatch(submitAttendance(attendanceStatus));
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center gap-5 lg:gap-10 py-10 ">
        <h1 className="text-xl lg:text-3xl font-bold">Today Attendance</h1>
        <p className="text-md lg:text-xl">
          {departmentName.toUpperCase()} - {graduate} {year} Year
        </p>
        <div className="w-full flex items-center justify-center flex-col px-10">
          <Link to="/view-students">
            <button className="bg-orange-500 text-white px-4 py-2 text-xs md:text-lg lg:px-6 lg:py-3 rounded-xl my-5 cursor-pointer hover:bg-blue-500">
              <p>View Students Only</p>
            </button>
          </Link>
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden ">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">
                  Reg No
                </th>

                <th className="hidden md:block border border-gray-300 px-4 py-3 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Present
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Absent
                </th>
              </tr>
            </thead>

            <tbody>
              {departmentStudentsData.map((department) => (
                <tr
                  className="hover:bg-gray-100 transition"
                  key={department.id}
                >
                  <td className="border border-gray-300 px-4 py-3">
                    {department.register_no}
                  </td>
                  <td className="hidden md:block border border-gray-300 px-4 py-3">
                    {department.student_name}
                  </td>

                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <input
                      type="radio"
                      name={`attendance-${department.id}`}
                      value="Present"
                      checked={
                        attendanceStatus[department.id]?.status === "Present"
                      }
                      onChange={() => handleAttendance(department, "Present")}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <input
                      type="radio"
                      name={`attendance-${department.id}`}
                      value="Absent"
                      checked={
                        attendanceStatus[department.id]?.status === "Absent"
                      }
                      onChange={() => handleAttendance(department, "Absent")}
                    />
                  </td>
                </tr>
              ))}

              <tr className="bg-blue-500 text-white font-bold hover:bg-gray-500 transition md:hidden">
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  Total Students
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {departmentStudentsData.length}
                </td>
              </tr>

              <tr className="hidden md:table-row bg-blue-500 text-white font-bold hover:bg-gray-500 transition">
                <td
                  colSpan={3}
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  Total Students
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {departmentStudentsData.length}
                </td>
              </tr>

              <tr className="bg-blue-500 text-white font-bold hover:bg-gray-500 transition md:hidden">
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  Total Present
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {totalPresent}
                </td>
              </tr>

              <tr className="hidden md:table-row bg-blue-500 text-white font-bold hover:bg-gray-500 transition">
                <td
                  colSpan={3}
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  Total Present
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {totalPresent}
                </td>
              </tr>

              <tr className="bg-blue-500 text-white font-bold hover:bg-gray-500 transition md:hidden">
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  Total Absent
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {totalAbsent}
                </td>
              </tr>

              <tr className="hidden md:table-row bg-blue-500 text-white font-bold hover:bg-gray-500 transition">
                <td
                  colSpan={3}
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  Total Absent
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {totalAbsent}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="bg-orange-500 text-white px-4 py-2 text-xs md:text-lg lg:px-6 lg:py-3 rounded-xl my-5 cursor-pointer hover:bg-blue-500"
            onClick={submitAttedance}
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="w-screen h-screen flex flex-col items-center gap-5 lg:gap-10 py-10 ">
  <h1 className="text-xl lg:text-3xl font-bold">Today Attendance</h1>
  <p className="text-md lg:text-xl">Computer Science - II Year</p>
  <div className="w-full flex items-center justify-center flex-col px-10">
    <button className="bg-orange-500 text-white px-4 py-2 text-xs md:text-lg lg:px-6 lg:py-3 rounded-xl my-5 cursor-pointer hover:bg-blue-500">
      View Students Only
    </button>
    <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden ">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="border border-gray-300 px-4 py-3 text-left">
            Name
          </th>
          <th className="border border-gray-300 px-4 py-3 text-center">
            Present
          </th>
          <th className="border border-gray-300 px-4 py-3 text-center">
            Absent
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="hover:bg-gray-100 transition">
          <td className="border border-gray-300 px-4 py-3">Jack</td>
          <td className="border border-gray-300 px-4 py-3 text-center">
            <input type="radio" name="jack" />
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center">
            <input type="radio" name="jack" />
          </td>
        </tr>

        <tr className="hover:bg-gray-100 transition">
          <td className="border border-gray-300 px-4 py-3">Mani</td>
          <td className="border border-gray-300 px-4 py-3 text-center">
            <input type="radio" name="mani" />
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center">
            <input type="radio" name="mani" />
          </td>
        </tr>
        <tr className="bg-blue-500 text-white font-bold hover:bg-gray-500 transition ">
          <td
            colSpan={2}
            className="border border-gray-300 px-4 py-3 text-center"
          >
            Total Present
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center">
            10
          </td>
        </tr>
        <tr className="bg-blue-500 text-white font-bold hover:bg-gray-500 transition">
          <td
            colSpan={2}
            className="border border-gray-300 px-4 py-3 text-center"
          >
            Total Present
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center">
            10
          </td>
        </tr>
      </tbody>
    </table>
    <button className="bg-orange-500 text-white px-4 py-2 text-xs md:text-lg lg:px-6 lg:py-3 rounded-xl my-5 cursor-pointer hover:bg-blue-500">
      Submit Attendance
    </button>
  </div>
</div> */
}
