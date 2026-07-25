import React, { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTeacherInfo,
  clearTeacherInfoError,
  teacherLogin,
} from "../../redux/slices/teacherSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading";
import useDocumentTitle from "../../hooks/useDocumnetTitle";
export const TeacherLogin = () => {
  useDocumentTitle("Teacher Login")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacherInfo, loading, error } = useSelector((state) => state.teacher);
  // console.log("teacherInfo:",teacherInfo);
  // console.log("error:",error);

  useEffect(() => {
    if (teacherInfo?.success) {
      navigate("/teacher-dashboard");
      toast.success(teacherInfo.message, {
        autoClose: 2000,
      });
      dispatch(clearTeacherInfo());
    }
    if (error) {
      toast.error(error.teacherInfo?.message, {
        autoClose: 2000,
      });
      dispatch(clearTeacherInfoError());
    }
  }, [teacherInfo, error, navigate, dispatch]);

  const [teacherData, setteacherData] = useState({
    email: "",
    password: "",
    role: "teacher",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setteacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(teacherLogin(teacherData));
  };
  return (
    <>
      <div className="relative w-full min-h-screen">
        {loading.teacherInfo && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
            <Loading />
          </div>
        )}
        <div className="admin-login-container h-screen w-screen lg:flex flex-col items-center md:pt-20 pt-10">
          <div className="flex flex-col gap-6 lg:gap-10">
            <h1 className="text-center text-white text-2xl lg:text-4xl font-bold">
              Welcome Back
            </h1>
            <form className="admin-form w-70 h-90 mx-auto md:w-90 md:h-100 lg:w-100 lg:h-100 flex  items-center flex-col  gap-10 py-10 px-5 rounded-xl shadow-[0_0_20px_whitesmoke]">
              <h1 className="text-xl lg:text-3xl text-white font-bold">
                Login
              </h1>
              <div className="w-full  relative ">
                <MdOutlineEmail className="absolute mt-3 ml-3 text-white" />
                <input
                  className="w-full border   outline-0 pl-10 py-2  mx-2 text-white rounded-lg focus:bg-black focus:border-2"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={teacherData.email}
                  onChange={handleInput}
                ></input>
              </div>
              <div className="w-full  relative ">
                <RiLockPasswordLine className="absolute mt-3 ml-3 text-white" />
                <input
                  className="w-full border  outline-0 pl-10 py-2 mx-2 text-white rounded-lg focus:bg-black focus:border-2"
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={teacherData.password}
                  onChange={handleInput}
                ></input>
              </div>
              <div className="">
                <input
                  className="text-md lg:text-xl text-white border rounded-xl px-6 py-2 cursor-pointer  mt-3 hover:bg-black outline-0"
                  type="submit"
                  value="Submit"
                  onClick={handleSubmit}
                  disabled={loading.teacherInfo}
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
