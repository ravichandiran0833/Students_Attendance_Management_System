import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allDepartments,
  clearAllDepartmentsError,
  clearAllDepartmentsInfo,
} from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

const AllDepartments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teacherSlice = useSelector((state) => state.teacher);
  console.log("teacherSlice :", teacherSlice);

  const { type } = useParams();
  // console.log("type:", type);

  const {
    allDepartmentsInfo,
    error,
    departmentStudentsInfo,
    submitAttendanceInfo,
  } = useSelector((state) => state.teacher);
  // console.log("error:", error);
  // console.log("allDepartmentsInfo:", allDepartmentsInfo);
  // console.log("departmentStudentsInfo:", departmentStudentsInfo);
  // console.log("submitAttendanceInfo:", submitAttendanceInfo);

  const departmentsData = allDepartmentsInfo?.allDepartmentsData;

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
    const classes = [];

    if (department.ug1) classes.push({ graduate: "UG", year: "I" });
    if (department.ug2) classes.push({ graduate: "UG", year: "II" });
    if (department.ug3) classes.push({ graduate: "UG", year: "III" });
    if (department.pg1) classes.push({ graduate: "PG", year: "I" });
    if (department.pg2) classes.push({ graduate: "PG", year: "II" });

    return classes;
  };

  const getSingleDepartment = (department, className) => {
    // console.log("departmentName:", department.department_name);
    // console.log("className:", className);
    if (type === "attendance-page") {
      navigate(
        `/teacher-dashboard/attendance-page/${department.id}/${department.department_name}/${className.graduate}/${className.year}`,
      );
    }
    if (type === "view-students") {
      navigate(
        `/teacher-dashboard/view-students/${department.department_name}/${className.graduate}/${className.year}`,
      );
    }
    if (type === "edit-attendance") {
      navigate(
        `/teacher-dashboard/edit-attendance/${department.id}/${department.department_name}/${className.graduate}/${className.year}`,
      );
    }
  };

  return (
    <>
      <div className="department-container h-auto">
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
                      className="animate-flower mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white animate-card transition delay-150 duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      style={{ animationDelay: `${index * 300}ms` }}
                      onClick={() => getSingleDepartment(department, item)}
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
    </>
  );
};

export default AllDepartments;
