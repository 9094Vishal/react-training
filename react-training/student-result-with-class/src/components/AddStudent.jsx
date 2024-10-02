import React, { Component, Fragment } from "react";
import Input from "mi-input-with-lable";
import { addHookTo } from "../helper/navigate";
import {
  editStudents,
  getId,
  getStudentById,
  setStudents,
} from "../helper/helper";
class AddStudent extends Component {
  id = this.props.params.id;

  editData = getStudentById(this.id);
  constructor(props) {
    super(props);
    this.state = {
      student: {
        name: this.editData.name ?? "",
        phone: this.editData.phone ?? "",
      },
      studentError: {
        name: "",
        phone: "",
      },
    };
  }
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = {
      ...this.state.student,
    };
    if (value != "") {
      const error = {
        ...this.state.studentError,
      };
      error.name = "";
      this.setState({
        studentError: error,
      });
    }
    data[name] = value;
    this.setState({
      student: data,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let isvalid = true;
    const data = {
      ...this.state.studentError,
    };
    Object.keys(this.state.student).forEach((item) => {
      if (this.state.student[item] == "") {
        data[item] = "This field is required!";
        this.setState({
          studentError: data,
        });
        isvalid = false;
      }
    });
    if (isvalid) {
      const isAdded = this.id
        ? editStudents({ ...this.state.student, id: this.editData.id })
        : setStudents({
            ...this.state.student,
            id: this.id ? this.id : getId(),
          });
      console.log(isAdded);

      if (isAdded) {
        this.props.navigate("/");
      } else {
        this.setState({
          studentError: {
            ...this.state.studentError,
            phone: "Data already exist!",
          },
        });
      }
    }
  };
  render() {
    const inputs = [
      {
        type: "text",
        name: "name",
        placeHolder: "Full name",
        value: `${this.state.student.name}`,

        label: "Full name",
      },
      {
        type: "number",
        name: "phone",
        placeHolder: "Phone number",
        value: `${this.state.student.phone}`,

        label: "Phone number",
      },
    ];
    if (this.id && Object.keys(this.editData).length == 0) {
      return (
        <>
          <h1 className="text-center mt-80 text-2xl">
            Roll number: {this.id}'s Data is not available
          </h1>
        </>
      );
    }
    return (
      <div className="px-10">
        <div className="overflow-x-auto h-[600px] text-center flex flex-col">
          <form
            className=" flex items-center  justify-center flex-col gap-5 flex-1"
            onSubmit={this.handleSubmit}
          >
            <h2 className="my-2 text-2xl text-center text-red-600">
              {this.id ? "Edit Student" : "Add Student"}
            </h2>
            {inputs.map(({ type, label, name, placeHolder }, id) => {
              return (
                <Fragment key={id}>
                  <Input
                    label={label}
                    error={this.state.studentError[name]}
                    props={{
                      type: type,
                      placeholder: placeHolder,
                      name: name,
                      value: this.state.student[name],
                      onChange: this.handleChange,
                    }}
                  />
                </Fragment>
              );
            })}
            <button className="bg-slate-400 text-white mt-2 py-2 px-10 rounded-lg">
              {this.id ? "Edit " : "Add "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default addHookTo(AddStudent);
