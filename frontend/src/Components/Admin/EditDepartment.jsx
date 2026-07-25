import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEditDepartmentInfo,
  clearError,
  clearSingleDepartmentInfo,
  editDepartment,
  singleDepartment,
} from "../../redux/slices/adminSlice";
import Loading from "../Loading";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDocumentTitle from "../../hooks/useDocumnetTitle";
const EditDepartment = () => {
  useDocumentTitle("Edit Department")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, singleDepartmentInfo, editDepartmentInfo } =
    useSelector((state) => state.admin);

  const singleDepartmentData = singleDepartmentInfo?.singleDepartmentData || {};
  console.log("singledepartmentData :", singleDepartmentData);

  const [department, setDepartment] = useState({
    departmentName: "",
    classes: [],
  });

  useEffect(() => {
    if (singleDepartmentData && singleDepartmentData?.id) {
      const classData = [];

      if (singleDepartmentData) {
        if (singleDepartmentData.ug1) classData.push("UG-I");
        if (singleDepartmentData.ug2) classData.push("UG-II");
        if (singleDepartmentData.ug3) classData.push("UG-III");
        if (singleDepartmentData.pg1) classData.push("PG-I");
        if (singleDepartmentData.pg2) classData.push("PG-II");
      }
      setDepartment({
        departmentName: singleDepartmentData.department_name,
        classes: classData,
      });
    }

    if (editDepartmentInfo?.success) {
      toast.success(editDepartmentInfo.message,{
        autoClose : 2000
      });
      navigate("../view-departments");
      dispatch(clearEditDepartmentInfo());
    }

    if (error?.message) {
      toast.error(error.message);
      dispatch(clearError());
    }
  }, [singleDepartmentData, editDepartmentInfo, dispatch, navigate, error]);

  useEffect(() => {
    dispatch(singleDepartment(id));

    return () => {
      dispatch(clearSingleDepartmentInfo());
    };
  }, [dispatch, id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDepartment((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleCheckBox = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setDepartment((prev) => ({
        ...prev,
        classes: [...prev.classes, value],
      }));
    } else {
      setDepartment((prev) => ({
        ...prev,
        classes: prev.classes.filter((item) => item !== value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDepartment({ id, department }));
  };

  return (
    <>
      <div className="relative w-full min-h-screen">
        {(loading.editDepartment || loading.singleDepartment) && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
            <Loading />
          </div>
        )}
        <div
          className={`w-full min-h-screen flex flex-col items-center py-6 md:py-10 px-4 bg-gray-400 transition-opacity duration-300 ${loading.editDepartment || loading.singleDepartment ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-10">
            Update Department
          </h1>

          <div className="w-70 md:w-xl lg:w-2xl bg-transparent shadow-[0_0_5px_whitesmoke] lg:shadow-[0_0_20px_whitesmoke] border border-gray-300 rounded">
            <form
              className="flex flex-col gap-3 lg:gap-6 p-4 md:p-8 text-white"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="md:w-40">Department Name</label>
                <input
                  type="text"
                  name="departmentName"
                  className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
                  value={department.departmentName}
                  onChange={handleInput}
                />
              </div>

              <div className="flex flex-col gap-4 mt-3 lg:flex-row  lg:items-center lg:justify-between">
                <div className="md:w-40 ">
                  <h3>Classes</h3>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:gap-5 border flex-wrap p-5 md:flex-1 md:justify-evenly">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      value="UG-I"
                      checked={department.classes.includes("UG-I")}
                      onChange={handleCheckBox}
                    ></input>
                    <label>UG - I year</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      value="UG-II"
                      checked={department.classes.includes("UG-II")}
                      onChange={handleCheckBox}
                    ></input>
                    <label>UG - II year</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      value="UG-III"
                      checked={department.classes.includes("UG-III")}
                      onChange={handleCheckBox}
                    ></input>
                    <label>UG - III year</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="PG-I"
                      checked={department.classes.includes("PG-I")}
                      onChange={handleCheckBox}
                    ></input>
                    <label>PG - I year</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="PG-II"
                      checked={department.classes.includes("PG-II")}
                      onChange={handleCheckBox}
                    ></input>
                    <label>PG - II year</label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-blue-500 px-10 py-2 rounded-xl mx-auto cursor-pointer"
                disabled={loading.editDepartment}
              >
                {loading.editDepartment ? "Update..." : "Update Department"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDepartment;
