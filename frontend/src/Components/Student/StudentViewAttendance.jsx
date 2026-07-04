import React, { useEffect } from "react";
import {} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { studentViewAttendance } from "../../redux/slices/studentSlice";
const StudentViewAttendance = () => {
    const {studentViewAttendanceInfo, loading, error} = useSelector((state)=>state.student)
    const studentAttendanceData = studentViewAttendanceInfo?.studentAttendanceData

    const dispatch = useDispatch()

    const id =1

    useEffect(()=>{
        dispatch(studentViewAttendance(id))
    },[dispatch])
  return (
    // <>
    //   <div>
    //     <div>
    //       <h1>Name :</h1>
    //       <h1>Register No :</h1>
    //     </div>
    //     <div>
    //       <table>
    //         <thead>
    //           <th>Date</th>
    //           <th>Reg No</th>
    //           <th>Status</th>
    //         </thead>
    //       </table>
    //       <tbody>
    //         <tr>
    //           <td>1/1/2026</td>
    //           <td>101</td>
    //           <td>Present</td>
    //         </tr>
    //         <tr>
    //           <td>2/1/2026</td>
    //           <td>101</td>
    //           <td>Absent</td>
    //         </tr>
    //         <tr>
    //           <td>3/1/2026</td>
    //           <td>101</td>
    //           <td>Present</td>
    //         </tr>
    //         <tr>
    //           <td>Total Present</td>
    //           <td>2</td>
    //         </tr>
    //         <tr>
    //           <td>Total Absent</td>
    //           <td>2</td>
    //         </tr>
    //         <tr>
    //           <td>Percentage</td>
    //           <td>90%</td>
    //         </tr>
    //       </tbody>
    //     </div>
    //   </div>
    // </>

    <>
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">

 
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Student Attendance Report
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <span className="font-semibold">Name :</span>
            <span className="ml-2">John Doe</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <span className="font-semibold">Register No :</span>
            <span className="ml-2">101</span>
          </div>
        </div>
      </div>

  
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Reg No</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">01/01/2026</td>
              <td className="px-4 py-3">101</td>
              <td className="px-4 py-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Present
                </span>
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">02/01/2026</td>
              <td className="px-4 py-3">101</td>
              <td className="px-4 py-3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                  Absent
                </span>
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">03/01/2026</td>
              <td className="px-4 py-3">101</td>
              <td className="px-4 py-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Present
                </span>
              </td>
            </tr>

           
            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-3">Total Present</td>
              <td className="px-4 py-3">2</td>
              <td></td>
            </tr>

            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-3">Total Absent</td>
              <td className="px-4 py-3">1</td>
              <td></td>
            </tr>

            <tr className="bg-blue-50 font-bold">
              <td className="px-4 py-3">Percentage</td>
              <td className="px-4 py-3 text-blue-600">90%</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</>
  );
};

export default StudentViewAttendance;
