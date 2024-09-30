import React, { useMemo } from "react";

const Student = ({ student, handleCLick }) => {
  return (
    <div className="px-10">
      <h2 className="my-2 text-2xl text-center text-red-600">Students data</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border border-slate-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th
                scope="col"
                className="px-2 w-40 py-3 border border-slate-500"
              >
                Roll Number
              </th>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                Name
              </th>
              {/* <th scope="col" className="px-6 py-3 border border-slate-500">
                Gender
              </th> */}
              {/* <th scope="col" className="px-6 py-3 border border-slate-500">
                See result
              </th> */}
            </tr>
          </thead>
          <tbody>
            {student.map(({ name, gender, id }, index) => {
              return (
                <tr className="bg-white" key={id}>
                  <th
                    scope="row"
                    className="px-6 py-4 border border-slate-500 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {id}
                  </th>
                  <th
                    onClick={() => handleCLick(id)}
                    scope="row"
                    className="px-6 py-4 border cursor-pointer border-slate-500 font-medium text-gray-900 whitespace-nowrap hover:bg-slate-300"
                  >
                    {name}
                  </th>
                  {/* <td className="px-6 py-4 border border-slate-500">
                    {gender}
                  </td>
                  <td className="px-6 py-4 border text-black border-slate-500">
                    <button
                      className="bg-slate-400 py-2 px-10 "
                      onClick={() => handleCLick(id)}
                    >
                      Result
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
