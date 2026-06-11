import React from "react";

export const AddDepartment = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center py-6 md:py-10 px-4 bg-gray-400">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-10">
          Add Department
        </h1>

        <div className="w-70 md:w-xl lg:w-2xl bg-transparent shadow-[0_0_5px_whitesmoke] lg:shadow-[0_0_20px_whitesmoke] border border-gray-300 rounded">
          <form className="flex flex-col gap-3 lg:gap-6 p-4 md:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Department Name</label>
              <input
                type="text"
                name="departmentName"
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
              />
            </div>

            <div className="flex flex-col gap-4 mt-3 lg:flex-row  lg:items-center lg:justify-between">
              <div className="md:w-40 ">
                <h3>Classes</h3>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:gap-5 border flex-wrap p-5 md:flex-1 md:justify-evenly">
                <div className="flex gap-2">
                  <input type="checkbox"></input>
                  <label>UG - I year</label>
                </div>

                <div>
                  <input type="checkbox"></input>
                  <label>UG - I year</label>
                </div>

                <div>
                  <input type="checkbox"></input>
                  <label>UG - I year</label>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <label>UG - I year</label>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <label>UG - I year</label>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Email</label>
              <input
                type="email"
                name="email"
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Password</label>
              <input
                type="password"
                name="password"
                className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Department</label>
              <select className="border flex-1 px-4 py-1 lg:py-2 rounded outline-none ">
                <option className="bg-white text-black">Tamil</option>
                <option className="bg-white text-black">English</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="md:w-40">Profile Pic</label>
              <input
                type="file"
                name="profile"
                className="border flex-1 min-w-0 py-1 lg:py-2 rounded"
              />
            </div> */}

            <button
              type="submit"
              className="bg-orange-500 hover:bg-blue-500 px-10 py-2 rounded-xl mx-auto cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
