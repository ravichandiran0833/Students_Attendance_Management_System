import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  clearAllDepartmentsInfo,
  clearDeleteDepartmentInfo,
  clearError,
  deleteDepartment,
  getAllDepartments,
} from "../../redux/slices/adminSlice";
import Loading from "../Loading";
const ViewDepartments = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { getAllDepartmentsInfo, loading, deleteDepartmentInfo, error } = useSelector(
    (state) => state.admin,
  );

   const adminSlice = useSelector(
    (state) => state.admin,
  );

  console.log("view department admin slice : ",adminSlice);
  

  console.log("getAllDepartmentsInfo:", getAllDepartmentsInfo);

  const departmentData = getAllDepartmentsInfo?.departmentsData || [];

  const getClasses = (department) => {
    const classes = [];

    if (department.ug1) classes.push("UG-I");
    if (department.ug2) classes.push("UG-II");
    if (department.ug3) classes.push("UG-III");
    if (department.pg1) classes.push("PG-I");
    if (department.pg2) classes.push("PG-II");

    console.log("classes:", classes);

    return classes;
  };

  console.log("departmentData:", departmentData);

  useEffect(() => {
    dispatch(getAllDepartments());

    return ()=>{
        dispatch(clearAllDepartmentsInfo())
    }
  }, [dispatch]);

  useEffect(()=>{
    if(error?.message){
      toast.error(error.message)
      dispatch(clearError())
    }
    if(deleteDepartmentInfo?.success){
      toast.success(deleteDepartmentInfo.message)
      dispatch(clearDeleteDepartmentInfo())
      dispatch(getAllDepartments())
    }
  },[deleteDepartmentInfo,dispatch,error])

  const handleEditDepartment = (id) => {
    navigate(`../edit-department/${id}`)
  };

  const handleDeleteDepartment =(id)=>{
    dispatch(deleteDepartment(id))
  }

  return (
    <>
      {loading && <Loading />}
      <div className="w-full flex flex-col items-center py-15 gap-10">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">Departments List</h1>
        </div>

        <div className="w-full flex justify-center items-center">
          <table className="border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden md:w-2xl lg:w-4xl">
            <thead className="bg-blue-600 text-white text-xs md:text-lg">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Classes
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {departmentData.map((department) => (
                <tr
                  className="hover:bg-gray-100 transition"
                  key={department.id}
                >
                  <td className="border border-gray-300 px-4 py-3 text-center text-md md:text-xl">
                    {department.department_name.charAt(0).toUpperCase() +
                      department.department_name.slice(1)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-md md:text-xl">
                    {getClasses(department).length}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center ">
                    <div className="text-xs flex gap-2 md:gap-4 justify-center items-center md:text-lg">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded border-none outline-none cursor-pointer"
                        onClick={() => handleEditDepartment(department.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded border-none outline-none cursor-pointer"
                          onClick={()=>handleDeleteDepartment(department.id)}
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
                  Total Departments
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-xs md:text-xl">
                  {departmentData.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewDepartments;
