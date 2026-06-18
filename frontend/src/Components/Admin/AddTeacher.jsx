import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeacher,
  clearError,
  clearteacherInfo,
} from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { toast } from "react-toastify";
export const AddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [profile, setProfile] = useState(null);

  console.log("profile:", profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacherInfo, loading, error } = useSelector((state) => state.admin);

  const adminSlice = useSelector((state) => state.admin);
  console.log("adminSlice : ", adminSlice);

  console.log("teacherInfo:", teacherInfo);
  console.log("error:", error);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if(password.length < 8){
      toast.error("Password Length Must be 8 Digit")
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("department", department);
    formData.append("profile", profile);

    // console.log([...formData.entries()]);

    // console.log("profile:", profile);

    dispatch(addTeacher(formData));
  };

  useEffect(() => {
    if (teacherInfo?.success == true) {
      toast.success(teacherInfo.message, {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);
      dispatch(clearteacherInfo());
    }
  }, [teacherInfo, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      {loading && <Loading />}
      <div className="w-full min-h-screen flex flex-col items-center py-6 md:py-10 px-4 bg-gray-400">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-10">
          Add Teacher
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
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Password</label>
              <input
                type="password"
                name="password"
                required
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Department</label>
              <select
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none "
                required
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>

                <option className="bg-white text-black" value="tamil">
                  Tamil
                </option>
                <option className="bg-white text-black" value="english">
                  English
                </option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Profile Pic</label>
              <input
                type="file"
                name="profile"
                className="border flex-1 pl-5 py-1 lg:py-2 rounded"
                required
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-blue-500 px-10 py-2 rounded-xl mx-auto cursor-pointer"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Teacher"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
