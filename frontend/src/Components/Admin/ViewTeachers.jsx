import { useDispatch, useSelector } from "react-redux";
import profilePic from "../../assets/log1.jpg";
import { useNavigate } from "react-router-dom"
import Loading from "../Loading";
import { useEffect } from "react";
import { toast } from "react-toastify"
import { clearDeleteTeacherInfo, clearError, deleteTeacher, viewTeachers } from "../../redux/slices/adminSlice";
export const ViewTeachers = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { AllTeachersData, loading, deleteTeacherInfo, error } = useSelector((state) => state.admin);

  const adminSlice = useSelector((state) => state.admin);
  console.log("viewTeachers adminSlice : ", adminSlice);

  const teachersData = AllTeachersData?.teachersData || [];

  const editTeacher =(id)=>{
    navigate(`../edit-teacher/${id}`)
    
  }

  const handleDeleteTeacher =(id)=>{
    dispatch(deleteTeacher(id))
  }
  
  useEffect(()=>{
    if(deleteTeacherInfo?.success){
      toast.success(deleteTeacherInfo.message)
      dispatch(viewTeachers())
      dispatch(clearDeleteTeacherInfo())
    }
    if(error){
      toast.error(error.message || error)
      dispatch(clearError())
    }
  },[deleteTeacherInfo, error,dispatch])

  useEffect(()=>{
    dispatch(viewTeachers())
  },[dispatch])

  return (
    <>
      {loading && <Loading />}
      <div className="w-full flex flex-col items-center py-15 gap-10">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">Teachers List</h1>
        </div>

        <div className="w-full flex justify-center items-center">
          <table className="border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden md:w-2xl lg:w-4xl">
            <thead className="bg-blue-600 text-white text-xs md:text-lg">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">
                  Profile
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
              {teachersData.map((teacher) => (
                <tr className="hover:bg-gray-100 transition" key={teacher.id}>
                  <td className="border border-gray-300 px-4 py-1">
                    <img
                      src={teacher.profile}
                      className="w-12 h-12 rounded-full object-cover md:w-15 md:h-15"
                    ></img>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-md md:text-xl">
                    {teacher.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center ">
                    <div className="text-xs flex gap-2 md:gap-4 justify-center items-center md:text-lg">
                      <button 
                      className="bg-green-500 text-white px-2 py-1 rounded border-none outline-none cursor-pointer"
                      onClick={()=>editTeacher(teacher.id)}
                      >
                        Edit
                      </button>
                      <button 
                      className="bg-red-500 text-white px-2 py-1 rounded border-none outline-none cursor-pointer"
                      onClick={()=>handleDeleteTeacher(teacher.id)}
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
                  Total Teachers
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-xs md:text-xl">
                  {teachersData.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

