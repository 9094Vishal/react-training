import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentData } from "../data/Student";
import { getStudents } from "../helper/helper";

const UserTable = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = getStudents().find((item) => item.id == id);
  if (!student || !student.result) {
    return (
      <div className="w-full text-center">
        <h1 className="text-center mt-80 text-2xl">
          Roll number: {id}'s Data is not available
        </h1>
        <button
          className="px-5 py-2 bg-slate-300 mt-2 text-center rounded-sm"
          onClick={() => navigate(`/add-result/${id}`)}
        >
          Add Result Student
        </button>
      </div>
    );
  }

  const { name, result } = student;

  const { math, science, english, physics, computer } = result;
  const total =
    Number(math) +
    Number(science) +
    Number(english) +
    Number(physics) +
    Number(computer);
  let isFail = false;
  Object.keys(result).forEach((item) => {
    if (Number(result[item]) < 40) {
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
      <div className="  h-[600px]  flex justify-center flex-col gap-4 items-center">
        <h2 className="text-2xl text-center">{name}</h2>
        <table className="w-full text-sm text-left text-gray-500 border border-slate-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              {Object.keys(result).map((subject, id) => {
                return (
                  <th
                    scope="col"
                    key={id}
                    className="px-6 py-3 border border-slate-500"
                  >
                    {subject}
                  </th>
                );
              })}
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
              {Object.values(result).map((subject, id) => {
                return (
                  <td key={id} className="px-6 py-4 border border-slate-500 ">
                    {subject}
                  </td>
                );
              })}
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
