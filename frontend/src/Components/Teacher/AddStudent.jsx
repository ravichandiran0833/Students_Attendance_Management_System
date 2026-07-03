import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addStudent,
  clearAddStudentError,
  clearAddStudentInfo,
} from "../../redux/slices/teacherSlice";
import { toast } from "react-toastify";
import Loading from "../Loading";

const AddStudent = () => {
  const { departmentId, departmentName, graduate, year } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addStudentInfo, error, loading } = useSelector(
    (state) => state.teacher,
  );

  const teacherSlice = useSelector((state) => state.teacher);
  console.log("add student teacher slice : ", teacherSlice);

  const [registerNo, setRegisterNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profile, setProfile] = useState("");

  const formData = new FormData();
  formData.append("registerNo", registerNo);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("gender", gender);
  formData.append("phoneNumber", phoneNumber);
  formData.append("profile", profile);
  formData.append("departmentId", departmentId);
  formData.append("departmentName", departmentName);
  formData.append("graduate", graduate);
  formData.append("year", year);

  useEffect(() => {
    if (addStudentInfo?.success) {
      toast.success(addStudentInfo?.message, {
        autoClose: 2000,
      });
      dispatch(clearAddStudentInfo());
      navigate("/teacher-dashboard/all-departments/add-student");
    }
    if (error) {
      toast.error(error.addStudent?.message);
      dispatch(clearAddStudentError());
    }
  }, [addStudentInfo, error, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("formdata 1 :",formData.entries());
    //  console.log("formdata :",[...formData.entries()]);
    dispatch(addStudent(formData));
  };
  return (
    <>
      <div className="relative w-full min-h-screen">
        {(loading.addStudent || loading.allDepartments) && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
            <Loading />
          </div>
        )}
        <div
          className={`w-full min-h-screen flex flex-col items-center py-6 md:py-10 px-4 bg-gray-400 transition-opacity duration-300 ${loading.addStudent ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-10">
            Add Student
          </h1>

          <div className="w-65 md:w-xl lg:w-full lg:max-w-2xl bg-transparent shadow-[0_0_5px_whitesmoke] lg:shadow-[0_0_20px_whitesmoke] border border-gray-300 rounded">
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
              {/* md:gap-2 my-4  md:flex-row */}

              <div className="flex flex-col md:flex-row md:gap-4">
                <label className="md:w-40">Gender</label>
                <div className="flex  md:flex-none">
                  <input
                    type="radio"
                    name="gender"
                    required
                    value={"male"}

                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                  <input
                    type="radio"
                    name="gender"
                    required
                    value={"female"}
                    className="ml-4 flex justify-center items-center"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                  <input
                    type="radio"
                    name="gender"
                    required
                    value={"others"}
                    className="ml-4 flex justify-center items-center"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Others
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="md:w-40">Phone Number</label>
                <input
                  type="number"
                  name="phone"
                  required
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
                  required
                  onChange={(e) => setProfile(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-blue-500 px-10 py-2 rounded-xl mx-auto cursor-pointer"
                disabled={loading.addStudent}
              >
                {loading.addStudent ? "Adding..." : "Add Student"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
