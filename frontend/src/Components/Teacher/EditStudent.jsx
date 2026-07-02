import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearEditStudentError,
  clearEditStudentInfo,
  clearSingleStudentError,
  clearSingleStudentInfo,
  editStudent,
  getSingleStudent,
} from "../../redux/slices/teacherSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading";

const EditStudent = () => {
  const teacherSlice = useSelector((state) => state.teacher);
  console.log("teacherSlice :", teacherSlice);

  const { getSingleStudentInfo, loading, error, editStudentInfo } = useSelector(
    (state) => state.teacher,
  );

  const studentData = getSingleStudentInfo?.singleStudentData || {};

  const {id} = studentData

  const { registerNum } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [registerNo, setRegisterNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profile, setProfile] = useState("");

//   const [oldPassword, setoldPassword] = useState("");
//   const [oldProfile, setOldProfile] = useState("");

  useEffect(() => {
    if (studentData) {
      setRegisterNo(studentData.register_no);
      setName(studentData.student_name);
      setEmail(studentData.email);
      setGender(studentData.gender);
      setPhoneNumber(studentData.phone);
    //   setPassword(studentData.password);

    //   setoldPassword(studentData.password);
    //   setOldProfile(studentData.profile_image);
    }

    if(editStudentInfo?.message){
        toast.success(editStudentInfo?.message,{
            autoClose : 2000
        })
        dispatch(clearEditStudentInfo())
        navigate("/teacher-dashboard/all-departments/view-students")
        
    }

    if (error.singleStudent?.message) {
      toast.error(error.singleStudent?.message || error.message, {
        autoClose: 2000,
      });
      dispatch(clearSingleStudentError());
    }

    if(error.editStudent?.message){
        toast.error(error.editStudent?.message || error.message, {
            autoClose : 2000
        })
        dispatch(clearEditStudentError())
    }

  }, [studentData, error, dispatch, editStudentInfo]);

  useEffect(() => {
    dispatch(getSingleStudent(registerNum));

    return ()=>{
        dispatch(clearSingleStudentInfo())
    }
  }, [dispatch, registerNum]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("registerNo", registerNo);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password)
    formData.append("profile", profile)

    console.log("edit form data :", [...formData.entries()]);

    dispatch(editStudent({id, formData}))
  };

  return (
    <>
      <div className="relative w-full min-h-screen">
        {loading.editStudent &&(
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
            <Loading />
          </div>
        )}
        <div
          className={`w-full min-h-screen flex flex-col items-center py-6 md:py-10 px-4 bg-gray-400 transition-opacity duration-300 ${loading.editStudent ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-10">
            Edit Student
          </h1>

          <div className="w-auto md:w-xl lg:w-full lg:max-w-2xl bg-transparent shadow-[0_0_5px_whitesmoke] lg:shadow-[0_0_20px_whitesmoke] border border-gray-300 rounded">
            <form
              className="flex flex-col gap-3 lg:gap-6 p-4 md:p-8 text-white"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="md:w-40">Register number</label>
                <input
                  type="text"
                  name="registerNo"
                  required
                  value={registerNo}
                  className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
                  onChange={(e) => setRegisterNo(e.target.value)}
                />
              </div>
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
                <label className="md:w-40">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
               
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex   md:gap-2 my-4">
                <label className="md:w-40">Gender</label>
                <input
                  type="radio"
                  name="gender"
                  required
                  value={"Male"}
                  checked={gender == "Male"}
                  className="ml-4 flex justify-center items-center"
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  required
                  checked={gender == "Female"}
                  value={"Female"}
                  className="ml-4 flex justify-center items-center"
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
                <input
                  type="radio"
                  name="gender"
                  required
                  checked={gender == "Others"}
                  value={"Others"}
                  className="ml-4 flex justify-center items-center"
                  onChange={(e) => setGender(e.target.value)}
                />
                Others
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="md:w-40">Phone Number</label>
                <input
                  type="number"
                  name="phone"
                  required
                  value={phoneNumber}
                  className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
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
                disabled={loading.editStudent}
              >
                {loading.editStudent ? "Updating..." : "Edit Student"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStudent;

// ${loading.addStudent ? "opacity-50 pointer-events-none" : "opacity-100"}
