import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDeleteStudentError,
  clearDeleteStudentInfo,
  clearViewStudentsError,
  clearViewStudentsInfo,
  deleteStudent,
  viewStudents,
} from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";
import Loading from "../Loading";
const ViewStudents = () => {
  const teacherSlice = useSelector((state) => state.teacher);
  console.log("teacherSlice :", teacherSlice);

  const [search, setSearch] = useState("");

  const { departmentName, graduate, year } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { viewStudentsInfo, error, loading , deleteStudentInfo} = useSelector(
    (state) => state.teacher,
  );

  const studentsData = viewStudentsInfo?.viewStudentsData || [];

  // console.log("studentsData :",studentsData);

  useEffect(() => {
    dispatch(viewStudents({ departmentName, graduate, year }));

    return () => {
      dispatch(clearViewStudentsInfo());
    };
  }, [departmentName, graduate, year, dispatch]);

  useEffect(() => {
    if (viewStudentsInfo?.success) {
      toast.success(viewStudentsInfo?.message, {
        autoClose: 2000,
      });
    }
    if (error.viewStudents) {
      toast.error(error.viewStudents?.message, {
        autoClose: 2000,
      });
      dispatch(clearViewStudentsError());
    }
    if(deleteStudentInfo?.success){
      toast.success(deleteStudentInfo?.message,
        {
          autoClose : 2000
        }
      )
      dispatch(clearDeleteStudentInfo())
      dispatch(viewStudents({ departmentName, graduate, year }))
    }
    if(error.deleteStudent){
      toast.error(error.deleteStudent?.message, {
        autoClose : 2000
      })
      dispatch(clearDeleteStudentError())
    }
  }, [viewStudentsInfo, error, dispatch, deleteStudentInfo]);

  const filteredStudents =
    search === ""
      ? studentsData
      : studentsData.filter((student) =>
          student.student_name
            .toLowerCase()
            .includes(search.toLocaleLowerCase()),
        );

  const handleEditStudent = (registerNo) => {
    navigate(`/teacher-dashboard/edit-student/${registerNo}`);
  };

  const handleDeleteStudent =(id)=>{
    dispatch(deleteStudent(id))
  }

  return (
    <>
      <div className="relative w-full min-h-screen">
        {(loading.deleteStudent || loading.viewStudents) && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
            <Loading />
          </div>
        )}
        <div
          className={`w-full flex flex-col items-center py-15 gap-10 transition-opacity duration-300 ${loading.deleteStudent || loading.viewStudents ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <div className="flex flex-col justify-center items-center gap-3">
            
            <p className="text-xl font-bold md:text-2xl">
              {departmentName.toUpperCase()} - {graduate} {year} Year
            </p>
            <h1 className="text-xl font-bold md:text-2xl">Students List</h1>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full md:w-2xl lg:w-4xl">
              <input
                type="text"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-400 outline-none rounded px-3 w-full py-1 "
              ></input>
            </div>
            <table className="border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden md:w-2xl lg:w-4xl">
              <thead className="bg-blue-600 text-white text-xs md:text-lg">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-center">
                    Register_no
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr className="hover:bg-gray-100 transition" key={student.id}>
                    <td className="border border-gray-300 px-4 py-3 text-center text-md md:text-xl">
                      {student.register_no}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-md md:text-xl">
                      {student.student_name.charAt(0).toUpperCase() +
                        student.student_name.slice(1)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center ">
                      <div className="text-xs flex gap-2 md:gap-4 justify-center items-center md:text-lg">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded border-none outline-none cursor-pointer"
                          onClick={() => handleEditStudent(student.register_no)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded border-none outline-none cursor-pointer"
                          onClick={() => handleDeleteStudent(student.id)}
                          disabled={loading.viewStudents}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-500 text-white font-bold hover:bg-gray-500 transition ">
                  <td
                    colSpan={2}
                    className="border border-gray-300 px-4 py-3 text-center text-xs md:text-xl"
                  >
                    Total Students
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-xs md:text-xl">
                    {filteredStudents.length}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudents;

// ${loading.getAllDepartments || loading.deleteDepartment ? "opacity-50 pointer-events-none" : "opacity-100"}
