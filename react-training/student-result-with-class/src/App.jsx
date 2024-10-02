import { Route, Routes } from "react-router";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import Student from "./components/Student";
import AddResult from "./components/AddResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Students />} />
      <Route path="/student/add" element={<AddStudent />} />
      <Route path="/student/:id" element={<Student />} />
      <Route path="/student/edit/:id" element={<AddStudent />} />
      <Route path="/student/result/:id" element={<AddResult />} />
    </Routes>
  );
}

export default App;
