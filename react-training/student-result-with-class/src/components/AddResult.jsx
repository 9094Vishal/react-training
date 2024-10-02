import React, { Component, Fragment } from "react";
import { addHookTo } from "../helper/navigate";
import { getResult, setResult } from "../helper/helper";
import Input from "mi-input-with-lable";
class AddResult extends Component {
  id = this.props.params.id;
  editData = getResult(this.id);
  constructor(props) {
    super(props);
    this.state = {
      student: this.editData,
      studentError: {
        math: "",
        science: "",
        english: "",
        physics: "",
        computer: "",
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
      setResult({ ...this.state.student, id: this.id });
      this.props.navigate("/");
    }
  };
  render() {
    const inputs = [
      {
        type: "number",
        name: "math",
        placeHolder: "Maths Marks ",
        value: `${this.state.student.math}`,

        label: "Maths Marks",
      },
      {
        type: "number",
        name: "science",
        placeHolder: "Science Marks",
        value: `${this.state.student.science}`,

        label: "Science Marks",
      },
      {
        type: "number",
        name: "english",
        placeHolder: "English Marks",
        value: `${this.state.student.english}`,

        label: "English Marks",
      },
      {
        type: "number",
        name: "physics",
        placeHolder: "Physics Marks",
        value: `${this.state.student.physics}`,

        label: "Physics Marks",
      },
      {
        type: "number",
        name: "computer",
        placeHolder: "Computer Marks",
        value: `${this.state.student.computer}`,

        label: "Computer Marks",
      },
    ];
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
export default addHookTo(AddResult);
