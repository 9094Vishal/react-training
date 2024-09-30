import React, { Fragment, useState } from "react";

import Input from "./Input";
import { editStudents, getId, getResult, setStudents } from "../helper/helper";
import { useNavigate, useParams } from "react-router-dom";

const AddResult = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editData = getResult(id);

  const [student, setStudent] = useState(editData);

  const [studentError, setStudentError] = useState({
    math: "",
    science: "",
    english: "",
    physics: "",
    computer: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = {
      ...student,
    };
    if (value != "") {
      const error = {
        ...studentError,
      };
      error.name = "";
      setStudentError(error);
    }
    data[name] = value;
    setStudent(data);
  };
  const inputs = [
    {
      type: "number",
      name: "math",
      placeHolder: "Maths Marks ",
      value: `${student.math}`,

      label: "Maths Marks",
    },
    {
      type: "number",
      name: "science",
      placeHolder: "Science Marks",
      value: `${student.science}`,

      label: "Science Marks",
    },
    {
      type: "number",
      name: "english",
      placeHolder: "English Marks",
      value: `${student.english}`,

      label: "English Marks",
    },
    {
      type: "number",
      name: "physics",
      placeHolder: "Physics Marks",
      value: `${student.physics}`,

      label: "Physics Marks",
    },
    {
      type: "number",
      name: "computer",
      placeHolder: "Computer Marks",
      value: `${student.computer}`,

      label: "Computer Marks",
    },
  ];
  const handleSubmit = (event) => {
    event.preventDefault();
    let isvalid = true;
    const data = {
      ...studentError,
    };
    Object.keys(student).forEach((item) => {
      if (student[item] == "") {
        data[item] = "This field is required!";

        setStudentError(data);
        isvalid = false;
      }
    });
    if (isvalid) {
      const isAdded = id
        ? editStudents({ ...student, id: editData.id })
        : setStudents({ ...student, id: id ? id : getId() });
      if (isAdded) {
        navigate("/");
      } else {
        setStudentError({
          ...studentError,
          phone: "Data already exist!",
        });
      }
    }
  };
  return (
    <div className="px-10">
      <div className="overflow-x-auto h-[600px] text-center flex flex-col">
        <form
          className=" flex items-center  justify-center flex-col gap-5 flex-1"
          onSubmit={handleSubmit}
        >
          <h2 className="my-2 text-2xl text-center text-red-600">
            {id ? "Edit Student" : "Add Student"}
          </h2>
          {inputs.map(({ type, label, name, placeHolder }, id) => {
            return (
              <Fragment key={id}>
                <Input
                  label={label}
                  error={studentError[name]}
                  props={{
                    type: type,
                    placeholder: placeHolder,
                    name: name,
                    value: student[name],
                    onChange: handleChange,
                  }}
                />
              </Fragment>
            );
          })}
          <button className="bg-slate-400 text-white mt-2 py-2 px-10 rounded-lg">
            {id ? "Edit " : "Add "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResult;
