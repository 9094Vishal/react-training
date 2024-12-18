import React, { useMemo, useState } from "react";
import { StudentData } from "../data/Student";
import { useNavigate } from "react-router-dom";
import { getId, getStudents } from "../helper/helper";
import ConfirmationPopUp from "./ConfirmationPopUp";

const Student = ({}) => {
  const navigate = useNavigate();
  const [student, setStudents] = useState(getStudents());
  const [isDeleteModelOpen, setIsDeletedeModelOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleCLick = (id) => {
    navigate(`/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };
  const handleResult = (id) => {
    navigate(`/add-result/${id}`);
  };
  const handelClose = () => {
    setIsDeletedeModelOpen(false);
  };
  const handleDelete = () => {
    const data = getStudents().filter((item) => item.id != index);
    setStudents(data);
    setIsDeletedeModelOpen(false);
    localStorage.setItem("students", JSON.stringify([...data]));
  };
  return (
    <div className="px-10">
      <div className="flex items-center justify-between">
        <h2 className="my-2 text-2xl text-center text-red-600">
          Students data
        </h2>
        <button onClick={() => navigate("add-student")}>Add student</button>
      </div>

      <div className="overflow-x-auto">
        {Object.keys(student).length == 0 ? (
          <div className="text-center">
            <p>Data not found!</p>
            <button
              className="px-5 py-2 bg-slate-300 rounded-sm"
              onClick={() => navigate("add-student")}
            >
              Add New Student
            </button>
          </div>
        ) : (
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
                <th
                  scope="col"
                  className="px-6 py-3 border border-slate-500"
                ></th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-slate-500"
                ></th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-slate-500"
                ></th>
              </tr>
            </thead>
            <tbody>
              {student.map(({ name, id, result }, index) => {
                return (
                  <tr className="bg-white" key={id}>
                    <th
                      scope="row"
                      className="px-6 py-4 w-[50px] border border-slate-500 font-medium text-gray-900 whitespace-nowrap"
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
                    <th
                      scope="row"
                      className="px-6 py-4  border w-[50px] border-slate-500 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <button
                        className="bg-slate-300 py-2 px-5 rounded-md mr-2"
                        onClick={() => handleResult(id)}
                      >
                        {result ? "Edit result" : "Add result"}
                      </button>
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4  border w-[50px] border-slate-500 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <button
                        className="bg-slate-300 py-2 px-5 rounded-md mr-2"
                        onClick={() => handleEdit(id)}
                      >
                        Edit
                      </button>
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 border w-[50px] border-slate-500 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <button
                        className="hover:bg-red-500 bg-transparent border border-red-500 py-2 px-5 rounded-md mr-2"
                        onClick={() => {
                          setIndex(id);
                          setIsDeletedeModelOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {isDeleteModelOpen && (
        <ConfirmationPopUp
          handelClose={handelClose}
          handelDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Student;
