import React from "react";

export const TeacherDashboard = () => {
  const departments = [
    {
      name: "Tamil",
      classes: [
        { graduate: "UG", year: "I" },
        { graduate: "UG", year: "II" },
        { graduate: "UG", year: "III" },
        { graduate: "PG", year: "I" },
        { graduate: "PG", year: "II" },
      ],
    },
    {
      name: "English",
      classes: [
        { graduate: "UG", year: "I" },
        { graduate: "UG", year: "II" },
        { graduate: "UG", year: "III" },
      ],
    },
    {
      name: "Computer Science",
      classes: [
        { graduate: "UG", year: "I" },
        { graduate: "UG", year: "II" },
        { graduate: "UG", year: "III" },
        { graduate: "PG", year: "I" },
        { graduate: "PG", year: "II" },
      ],
    },
  ];
  return (
    <>
      <div className="department-container h-auto w-screen">
        <div className="flex flex-col items-center pt-20">
          {departments.map((department) => (
            <div className="w-full text-xs lg:text-lg mb-20">
              <h3 className="text-center text-white border py-2 text-xl">
                {department.name}
              </h3>
              <div className="w-full flex justify-evenly flex-wrap ">
                {department.classes.map((item) => (
                  <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white animate-card transition delay-150 duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
                    <p>
                      {item.graduate} - {item.year} Year
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

{
  /* <div className="flex flex-col items-center pt-10">
          <div className="w-full border  text-white py-2 text-xl">
            <h3 className="text-center">Tamil</h3>
          </div>
          <div className="w-full flex flex-wrap justify-around">
            <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>UG - I</p>
            </div>
            <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>UG -II Year </p>
            </div>
            <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>UG -III Year </p>
            </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>PG -I Year </p>
            </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
              <p>PG -II Year </p>
            </div>
          </div>
        </div>  */
}

{
  /* <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
                <p>UG -II Year </p>
              </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
                <p>UG -III Year </p>
              </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
                <p>PG -I Year </p>
              </div>
              <div className="mt-10 bg-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-500 hover:text-white">
                <p>PG -II Year </p>
              </div> */
}
