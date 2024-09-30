import React, { useMemo } from "react";

const UserTable = ({ student, handleBackCLick }) => {
  const { name, result } = student;

  const { math, science, english, physics, computer } = result;
  const total = math + science + english + physics + computer;
  let isFail = false;
  Object.keys(result).forEach((item) => {
    if (result[item] < 40) {
      isFail = true;
    }
  });

  const percentage = total / 5;
  let data = isFail
    ? {
        class: "Fail",
        color: "#fc1303",
        msg: "Need improvement.",
      }
    : percentage >= 75
    ? {
        class: "Distinction",
        color: "#14fc03",
        msg: "Congratulations you have cleared the exam with Distinction.",
      }
    : percentage >= 60 && percentage < 75
    ? {
        class: "First class",
        color: "#14fc03",
        msg: "Congratulations you have cleared the exam with First class.",
      }
    : percentage >= 45 && percentage < 60
    ? {
        class: "Second Class",
        color: "#c7c706",
        msg: "Congratulations you have cleared the exam with Second class.",
      }
    : {
        class: "Need improvement",
        color: "#fc9003",
        msg: "Congratulations you have cleared the exam with Pass class.",
      };

  return (
    <div className="px-10 overflow-y-hidden mt-2">
      <span className="cursor-pointer" onClick={handleBackCLick}>
        Back to list
      </span>
      {/* <div className="py-6 flex items-center w-full"></div> */}
      <div className="  h-[600px]  flex justify-center flex-col gap-4 items-center">
        <h2 className="text-2xl text-center">{name}</h2>
        <table className="w-full text-sm text-left text-gray-500 border border-slate-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                Physics
              </th>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                Maths
              </th>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                English
              </th>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                Science
              </th>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                Computer
              </th>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                Total
              </th>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                percentage
              </th>
              <th scope="col" className="px-6 py-3 border border-slate-500">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-6 py-4 border border-slate-500 ">{physics}</td>
              <td className="px-6 py-4 border border-slate-500">{math}</td>
              <td className="px-6 py-4 border border-slate-500">{english}</td>
              <td className="px-6 py-4 border border-slate-500">{science}</td>
              <td className="px-6 py-4 border border-slate-500">{computer}</td>
              <td className="px-6 py-4 border border-slate-500">{total}</td>
              <td className="px-6 py-4 border border-slate-500">
                {percentage}
              </td>
              <td
                style={{ color: data.color }}
                className={`px-6 py-4 border border-slate-500 `}
              >
                {data.class}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-full text-center mt-2" style={{ color: data.color }}>
          {data.msg}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
