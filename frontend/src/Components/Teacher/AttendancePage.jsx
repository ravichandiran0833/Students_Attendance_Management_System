import React from "react";

export const AttendancePage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center gap-5 lg:gap-10 py-10 ">
        <h1 className="text-xl lg:text-3xl font-bold">Today Attendance</h1>
        <p className="text-md lg:text-xl">Computer Science - II Year</p>
        <div className="w-full flex items-center justify-center flex-col px-10">
          <button className="bg-orange-500 text-white px-4 py-2 text-xs md:text-lg lg:px-6 lg:py-3 rounded-xl my-5 cursor-pointer hover:bg-blue-500">
            View Students Only
          </button>
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden ">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Present
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  Absent
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-100 transition">
                <td className="border border-gray-300 px-4 py-3">Jack</td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <input type="radio" name="jack" />
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <input type="radio" name="jack" />
                </td>
              </tr>

              <tr className="hover:bg-gray-100 transition">
                <td className="border border-gray-300 px-4 py-3">Mani</td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <input type="radio" name="mani" />
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <input type="radio" name="mani" />
                </td>
              </tr>
              <tr className="bg-blue-500 text-white font-bold hover:bg-gray-500 transition ">
                <td colSpan={2} className="border border-gray-300 px-4 py-3 text-center">
                  Total Present
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  10
                </td>
              </tr>
              <tr className="bg-blue-500 text-white font-bold hover:bg-gray-500 transition">
                <td colSpan={2} className="border border-gray-300 px-4 py-3 text-center">
                  Total Present
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  10
                </td>
              </tr>
            </tbody>
          </table>
          <button className="bg-orange-500 text-white px-4 py-2 text-xs md:text-lg lg:px-6 lg:py-3 rounded-xl my-5 cursor-pointer hover:bg-blue-500">Submit Attendance</button>
        </div>
      </div>
    </>
  );
};
