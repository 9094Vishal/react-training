import { useMemo, useState } from "react";
import UserTable from "./components/Students";
import { StudentData } from "./data/Student";
import Student from "./components/Student";
import { Route, Routes } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import AddResult from "./components/AddResult";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/:id" element={<UserTable />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-result/:id" element={<AddResult />} />

        <Route path="/edit-student/:id" element={<AddStudent />} />
      </Routes>
    </>
  );
}

export default App;
