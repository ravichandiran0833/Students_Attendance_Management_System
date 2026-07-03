import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEditAttendanceError,
  clearEditAttendanceInfo,
  clearSubmitEditAttendanceError,
  clearSubmitEditAttendanceInfo,
  editAttendance,
  submitEditAttendance,
} from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";
import Loading from "../Loading";

const EditAttendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { departmentId, departmentName, graduate, year } = useParams();

  const teacherSlice = useSelector((state) => state.teacher);
  console.log("teacherSlice :", teacherSlice);

  const { loading, error, editAttendanceInfo, submitEditAttendanceInfo } =
    useSelector((state) => state.teacher);

  const studentsData = editAttendanceInfo?.editAttendanceData || [];

  // console.log("studentsData : ",studentsData);

  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    if (studentsData.length > 0) {
      const initialAttendance = {};

      studentsData.forEach((student) => {
        initialAttendance[student.student_id] = {
          studentId: student.student_id,
          studentName: student.student_name,
          registerNo: student.register_no,
          status: student.status,
          attendanceDate: student.attendance_date,
        };
      });

      // console.log("initialAttendance:",initialAttendance);

      setAttendanceStatus(initialAttendance);
    }
  }, [studentsData]);

  useEffect(() => {
    if (editAttendanceInfo?.success) {
      toast.success(editAttendanceInfo?.message, {
        autoClose: 2000,
      });
    }
    if (submitEditAttendanceInfo?.success) {
      toast.success(submitEditAttendanceInfo?.message, {
        autoClose: 2000,
      });
      dispatch(clearSubmitEditAttendanceInfo());
      navigate("/teacher-dashboard/all-departments/attendance-page");
    }
    if (error.editAttendance?.message) {
      toast.error(error.editAttendance?.message || error.message, {
        autoClose: 2000,
      });
      dispatch(clearEditAttendanceError());
    }
    if (error.submitEditAttendance?.message) {
      toast.error(error.submitEditAttendance?.message || error.message, {
        autoClose: 2000,
      });
      dispatch(clearSubmitEditAttendanceError());
      dispatch(clearEditAttendanceInfo());
    }
  }, [editAttendanceInfo, submitEditAttendanceInfo, error, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearEditAttendanceInfo());
    };
  }, [dispatch]);

  const handleAttendance = (student, status) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [student.student_id]: {
        studentId: student.student_id,
        studentName: student.student_name,
        registerNo: student.register_no,
        status: status,
        attendanceDate: editDate,
      },
    }));
  };

  const submitDate = (e) => {
    e.preventDefault();
    if (editDate) {
      dispatch(
        editAttendance({
          departmentId,
          departmentName,
          graduate,
          year,
          attendanceDate: editDate,
        }),
      );
    }
  };

  const attendanceArray = Object.values(attendanceStatus);
  const totalPresent = attendanceArray.filter(
    (item) => item.status === "Present",
  ).length;
  const totalAbsent = attendanceArray.filter(
    (item) => item.status === "Absent",
  ).length;

  const submitAttedance = (e) => {
    e.preventDefault();
    console.log("edit attendance data :", attendanceStatus);
    if (totalPresent + totalAbsent !== studentsData.length) {
      return toast.warning("Please Select All Students");
    }

    dispatch(submitEditAttendance(attendanceStatus));
  };

  return (
    <>
      {loading.editAttendance && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
          <Loading />
        </div>
      )}
      <div className="w-full min-h-screen flex flex-col items-center gap-5 lg:gap-10 py-10 ">
        <h1 className="text-xl lg:text-3xl font-bold">Edit Attendance</h1>
        <p className="text-md lg:text-xl">
          {departmentName.toUpperCase()} - {graduate} {year} Year
        </p>
        <div className="flex gap-1 items-center">
          <label>Select Date</label>
          <input
            type="date"
            value={editDate}
            className="border px-2"
            onChange={(e) => setEditDate(e.target.value)}
          />
          <button
            className="bg-orange-500 text-white px-3 py-1  text-xs md:text-lg  rounded-xl  cursor-pointer hover:bg-blue-500"
            onClick={submitDate}
          >
            Submit
          </button>
        </div>
        <div className="w-full flex items-center justify-center flex-col px-10">
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
              {studentsData.map((student) => (
                <tr className="hover:bg-gray-100 transition" key={student.id}>
                  <td className="border border-gray-300 px-4 py-3">
                    {student.register_no}
                  </td>
                  <td className="hidden md:block border border-gray-300 px-4 py-3">
                    {student.student_name}
                  </td>

                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="Present"
                      checked={
                        attendanceStatus[student.student_id]?.status === "Present"
                      }
                      onChange={() => handleAttendance(student, "Present")}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="Absent"
                      checked={
                        attendanceStatus[student.student_id]?.status === "Absent"
                      }
                      onChange={() => handleAttendance(student, "Absent")}
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
                  {studentsData.length}
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
                  {studentsData.length}
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
            disabled={loading.editAttendance}
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </>
  );
};

export default EditAttendance;
