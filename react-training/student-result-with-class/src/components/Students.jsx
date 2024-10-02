import React, { Component } from "react";
import { getStudents, setStudents } from "../helper/helper";
import { useNavigate } from "react-router";
import { addHookTo } from "../helper/navigate";
import ConfirmationPopUp from "./ConfirmationPopUp";
class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: getStudents(),
      isDeleteModelOpen: false,
      index: 0,
    };
  }
  handleCLick = (id) => {
    this.props.navigate(`/student/${id}`);
  };
  handelEdit = (id) => {
    this.props.navigate(`/student/edit/${id}`);
  };
  handelClose = () => [
    this.setState({
      isDeleteModelOpen: false,
    }),
  ];
  handleResult = (id) => {
    this.props.navigate(`/student/result/${id}`);
  };
  handleDelete = () => {
    const data = getStudents().filter((item) => item.id != this.state.index);
    this.setState({
      students: data,
      isDeleteModelOpen: false,
    });
    localStorage.setItem("students", JSON.stringify([...data]));
  };
  render() {
    return (
      <div className="px-10">
        <div className="flex items-center justify-between">
          <h2 className="my-2 text-2xl text-center text-red-600">
            Students data
          </h2>
          <button onClick={() => this.props.navigate("student/add")}>
            Add student
          </button>
        </div>

        <div className="overflow-x-auto">
          {Object.keys(this.state.students).length == 0 ? (
            <div className="text-center">
              <p>Data not found!</p>
              <button
                className="px-5 py-2 bg-slate-300 rounded-sm"
                onClick={() => this.props.navigate("student/add")}
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
                {this.state.students.map(({ name, id, result }, index) => {
                  return (
                    <tr className="bg-white" key={id}>
                      <th
                        scope="row"
                        className="px-6 py-4 w-[50px] border border-slate-500 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {id}
                      </th>
                      <th
                        onClick={() => this.handleCLick(id)}
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
                          onClick={() => this.handleResult(id)}
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
                          onClick={() => this.handelEdit(id)}
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
                            this.setState({
                              index: id,
                              isDeleteModelOpen: true,
                            });
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
        {this.state.isDeleteModelOpen && (
          <ConfirmationPopUp
            handelClose={this.handelClose}
            handelDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}

export default addHookTo(Students);
