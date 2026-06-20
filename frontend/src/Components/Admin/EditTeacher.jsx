import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearAllDepartmentsInfo,
  clearEditTeacherInfo,
  clearError,
  clearSingleTeacher,
  editTeacher,
  getAllDepartments,
  getSingleTeacher,
} from "../../redux/slices/adminSlice";
import Loading from "../Loading";
import { useState } from "react";
import { toast } from "react-toastify";
const EditTeacher = () => {
  const {
    singleTeacher,
    loading,
    editTeacherInfo,
    error,
    getAllDepartmentsInfo,
  } = useSelector((state) => state.admin);

  console.log("Edit teacher error :",error);
  


  

  const adminSlice = useSelector((state) => state.admin);
  console.log("editTeacherInfo adminSlice :", adminSlice);

  const departmentsData = getAllDepartmentsInfo?.departmentsData || [];
  console.log("departmentsData:", departmentsData);

  // console.log("editTeacherInfo:",editTeacherInfo);

  const teacherData = singleTeacher?.singleTeacherData || {};
  console.log("teacherData :", teacherData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [profile, setProfile] = useState(null);
  const [oldProfile, setOldProfile] = useState("");

  useEffect(() => {
    if (teacherData) {
      setName(teacherData.name);
      setEmail(teacherData.email);
      setDepartment(teacherData.department);
      setOldProfile(teacherData.profile);
    }
     if(error){
       if(error && error.status === 404){
        console.log("error status:",error.status);
        
      navigate("/admin-dashboard")
    }
      toast.error(error.message || error)
      dispatch(clearError())
    }
   
    
  }, [teacherData, error,dispatch,navigate]);

  useEffect(() => {
    dispatch(getSingleTeacher(id));
    dispatch(getAllDepartments());

    return () => {
      dispatch(clearAllDepartmentsInfo());
      dispatch(clearSingleTeacher())
    };
  }, [dispatch, id]);



  useEffect(() => {
    if (editTeacherInfo?.success) {
      toast.success(editTeacherInfo.message);
      setTimeout(() => {
        navigate("/admin-dashboard/view-teachers");
      }, 1000);
    }
    dispatch(clearEditTeacherInfo());
    dispatch(clearSingleTeacher());
  }, [dispatch, navigate, editTeacherInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("department", department);
    if (profile) {
      formData.append("profile", profile);
      formData.append("oldProfile", oldProfile);
    } else {
      formData.append("oldProfile", oldProfile);
    }

    console.log("form data", [...formData.entries()]);
    dispatch(editTeacher({ id, formData }));
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full min-h-screen flex flex-col items-center py-6 md:py-10 px-4 bg-gray-400">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-10">
          Update Teacher
        </h1>

        <div className="w-70 md:w-xl lg:w-full lg:max-w-2xl bg-transparent shadow-[0_0_5px_whitesmoke] lg:shadow-[0_0_20px_whitesmoke] border border-gray-300 rounded">
          <form
            className="flex flex-col gap-3 lg:gap-6 p-4 md:p-8 text-white"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Name</label>
              <input
                type="text"
                name="name"
                required
                value={name}
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Email</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Department</label>
              <select
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none "
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>

                {departmentsData.map((department, index) => (
                  <option
                    className="bg-white text-black"
                    key={index}
                    value={department.department_name}
                  >
                    {department.department_name.charAt(0).toUpperCase() +
                      department.department_name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Profile Pic</label>
              <input
                type="file"
                name="profile"
                className="border flex-1 pl-5 py-1 lg:py-2 rounded"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-blue-500 px-10 py-2 rounded-xl mx-auto cursor-pointer"
              disabled={loading}
            >
              {loading ? "Update..." : "Update Teacher"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTeacher;
