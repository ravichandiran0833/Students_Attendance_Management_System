import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allDepartments,
  clearAllDepartmentsError,
  clearAllDepartmentsInfo,
} from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allDepartmentsInfo, error, departmentStudentsInfo,submitAttendanceInfo } = useSelector(
    (state) => state.teacher,
  );
  console.log("error:", error);
  console.log("allDepartmentsInfo:", allDepartmentsInfo);
  console.log("departmentStudentsInfo:", departmentStudentsInfo);
  console.log("submitAttendanceInfo:", submitAttendanceInfo);

  const departmentsData = allDepartmentsInfo?.allDepartmentsData;
  // console.log("departmentsData:", departmentsData);

  useEffect(() => {
    if (error) {
      toast.error(error.allDepartments?.message, {
        autoClose: 2000,
      });
      dispatch(clearAllDepartmentsError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(allDepartments());

    return () => {
      dispatch(clearAllDepartmentsInfo());
    };
  }, [dispatch]);

  const getClasses = (department) => {
    // console.log("dep :", department);
    const classes = [];

    if (department.ug1) classes.push({ graduate: "UG", year: "I" });
    if (department.ug2) classes.push({ graduate: "UG", year: "II" });
    if (department.ug3) classes.push({ graduate: "UG", year: "III" });
    if (department.pg1) classes.push({ graduate: "PG", year: "I" });
    if (department.pg2) classes.push({ graduate: "PG", year: "II" });

    return classes;
  };

  const getSingleDepartment = (departmentName, className) => {
    console.log("departmentName:", departmentName);
    console.log("className:", className);
    navigate(
      `/attendance-page/${departmentName}/${className.graduate}/${className.year}`,
    );
  };

  return (
    <div className="department-container h-auto w-screen">
      <div className="flex flex-col items-center pt-20">
        {departmentsData?.map((department) => {
          const classes = getClasses(department);

          return (
            <div
              key={department.id}
              className="w-full text-xs lg:text-lg mb-20"
            >
              <h3 className="text-center text-white border py-2 text-xl">
                {department.department_name}
              </h3>

              <div className="w-full flex justify-evenly flex-wrap">
                {classes?.map((item, index) => (
                  <div
                    key={index}
                    className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white animate-card transition delay-150 duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                    onClick={() =>
                      getSingleDepartment(department.department_name, item)
                    }
                  >
                    <p>
                      {item.graduate} - {item.year} Year
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

{
  /* <div className="flex flex-col items-center pt-10">
          <div className="w-full border  text-white py-2 text-xl">
            <h3 className="text-center">Tamil</h3>
          </div>
          <div className="w-full flex flex-wrap justify-around">
            <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>UG - I</p>
            </div>
            <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>UG -II Year </p>
            </div>
            <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>UG -III Year </p>
            </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>PG -I Year </p>
            </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>PG -II Year </p>
            </div>
          </div>
        </div>  */
}

{
  /* <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
                <p>UG -II Year </p>
              </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
                <p>UG -III Year </p>
              </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
                <p>PG -I Year </p>
              </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
                <p>PG -II Year </p>
              </div> */
}

// const departments = [
//   {
//     name: "Tamil",
//     classes: [
//       { graduate: "UG", year: "I" },
//       { graduate: "UG", year: "II" },
//       { graduate: "UG", year: "III" },
//       { graduate: "PG", year: "I" },
//       { graduate: "PG", year: "II" },
//     ],
//   },
//   {
//     name: "English",
//     classes: [
//       { graduate: "UG", year: "I" },
//       { graduate: "UG", year: "II" },
//       { graduate: "UG", year: "III" },
//     ],
//   },
//   {
//     name: "Computer Science",
//     classes: [
//       { graduate: "UG", year: "I" },
//       { graduate: "UG", year: "II" },
//       { graduate: "UG", year: "III" },
//       { graduate: "PG", year: "I" },
//       { graduate: "PG", year: "II" },
//     ],
//   },
// ];
